function buildErrorClass(name) {
    return class extends Error {
        constructor(message) {
            super(message);
            this.name = name;
        }
        //@ts-ignore
        static get name() {
            return name;
        }
    };
}
const ContentError = buildErrorClass('ContentError');
const SystemError = buildErrorClass('SystemError');
const CredentialsError = buildErrorClass('CredentialsError');
const NotFoundError = buildErrorClass('NotFoundError');
const UnauthorizedError = buildErrorClass('UnauthorizedError');
const errors = {
    ContentError,
    SystemError,
    CredentialsError,
    NotFoundError,
    UnauthorizedError,
};
export { ContentError, SystemError, CredentialsError, NotFoundError, UnauthorizedError, };
export default errors;
