class ExitError extends Error {
  constructor(code) {
    super(`The process should exit with ${code}`);
    this.code = code;
  }
}

export { ExitError as E };
