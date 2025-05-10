const WHITE_LIST = []; // TODO: agregar los orígenes permitidos

type CALLBACK = (err: Error | null, origin?: any) => void;
function checkAllowedOrigin(origin: string, cb: CALLBACK): void {
  const isAllowed = WHITE_LIST.includes(origin);

  if (!isAllowed && WHITE_LIST.length > 0) {
    cb(new Error("NOT ALLOWED BY CORS"));
    return;
  }
  cb(null, true);
}

export { checkAllowedOrigin };
