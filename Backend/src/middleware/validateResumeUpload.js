const MAX_JOB_DESCRIPTION_LENGTH = 5000;

export const validateResumeUpload = (req, res, next) => {
  const jobDescription = req.body?.jobDescription;

  if (jobDescription === undefined || jobDescription === null) {
    return next();
  }

  if (typeof jobDescription !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid jobDescription. It must be a string.'
    });
  }

  const normalizedJobDescription = jobDescription.trim();

  if (normalizedJobDescription.length === 0) {
    delete req.body.jobDescription;
    return next();
  }

  if (normalizedJobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Job description is too long. Maximum length is ${MAX_JOB_DESCRIPTION_LENGTH} characters.`
    });
  }

  req.body.jobDescription = normalizedJobDescription;
  return next();
};
