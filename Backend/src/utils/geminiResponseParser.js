const stripCodeFences = (value) => {
  return value
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
};

const extractFirstJsonObject = (value) => {
  const startIndex = value.indexOf('{');
  if (startIndex === -1) {
    return '';
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = startIndex; i < value.length; i += 1) {
    const char = value[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\' && inString) {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '{') {
        depth += 1;
      } else if (char === '}') {
        depth -= 1;
        if (depth === 0) {
          return value.slice(startIndex, i + 1);
        }
      }
    }
  }

  return '';
};

const tryParseObject = (candidate) => {
  if (!candidate) {
    return null;
  }

  try {
    const parsed = JSON.parse(candidate);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    return null;
  }

  return null;
};

export const parseGeminiAnalysisResponse = (responseText) => {
  if (typeof responseText !== 'string' || responseText.trim().length === 0) {
    throw new Error('Empty Gemini response');
  }

  const trimmed = responseText.trim();
  const withoutFences = stripCodeFences(trimmed);
  const extractedFromRaw = extractFirstJsonObject(trimmed);
  const extractedFromNoFences = extractFirstJsonObject(withoutFences);

  const candidates = [
    trimmed,
    withoutFences,
    extractedFromRaw,
    extractedFromNoFences
  ];

  for (const candidate of candidates) {
    const parsed = tryParseObject(candidate);
    if (parsed) {
      return parsed;
    }
  }

  throw new Error('Failed to parse Gemini JSON response');
};
