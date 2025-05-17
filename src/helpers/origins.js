const WHITE_LIST = []; // TODO: agregar los orígenes permitidos

function checkAllowedOrigin(origin, cb) {
  const isAllowed = WHITE_LIST.includes(origin);

  if (!isAllowed && WHITE_LIST.length > 0) {
    cb(new Error("NOT ALLOWED BY CORS"));
    return;
  }
  cb(null, true);
}

export { checkAllowedOrigin };
