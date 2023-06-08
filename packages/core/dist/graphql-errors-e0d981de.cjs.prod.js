'use strict';

var graphql = require('graphql');

/**
 * Converts the first character of a string to uppercase.
 * @param {String} str The string to convert.
 * @returns The new string
 */
const upcase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

/**
 * Turns a passed in string into
 * a human readable label
 * @param {String} str The string to convert.
 * @returns The new string
 */
const humanize = str => {
  return str.replace(/([a-z])([A-Z]+)/g, '$1 $2').split(/\s|_|\-/).filter(i => i).map(upcase).join(' ');
};

const userInputError = msg => new graphql.GraphQLError(`Input error: ${msg}`, {
  extensions: {
    code: 'KS_USER_INPUT_ERROR'
  }
});
const accessDeniedError = msg => new graphql.GraphQLError(`Access denied: ${msg}`, {
  extensions: {
    code: 'KS_ACCESS_DENIED'
  }
});
const prismaError = err => {
  if (err.code === undefined) {
    return new graphql.GraphQLError(`Prisma error`, {
      extensions: {
        code: 'KS_PRISMA_ERROR',
        debug: {
          message: err.message
        }
      }
    });
  }
  return new graphql.GraphQLError(`Prisma error: ${err.message.split('\n').slice(-1)[0].trim()}`, {
    extensions: {
      code: 'KS_PRISMA_ERROR',
      prisma: {
        ...err
      }
    }
  });
};
const validationFailureError = messages => {
  const s = messages.map(m => `  - ${m}`).join('\n');
  return new graphql.GraphQLError(`You provided invalid data for this operation.\n${s}`, {
    extensions: {
      code: 'KS_VALIDATION_FAILURE'
    }
  });
};
const extensionError = (extension, things) => {
  const s = things.map(t => `  - ${t.tag}: ${t.error.message}`).join('\n');
  return new graphql.GraphQLError(`An error occured while running "${extension}".\n${s}`, {
    extensions: {
      code: 'KS_EXTENSION_ERROR',
      debug: things.map(t => ({
        stacktrace: t.error.stack,
        message: t.error.message
      }))
    }
  });
};
const resolverError = things => {
  const s = things.map(t => `  - ${t.tag}: ${t.error.message}`).join('\n');
  return new graphql.GraphQLError(`An error occured while resolving input fields.\n${s}`, {
    extensions: {
      code: 'KS_RESOLVER_ERROR',
      debug: things.map(t => ({
        stacktrace: t.error.stack,
        message: t.error.message
      }))
    }
  });
};
const relationshipError = things => {
  const s = things.map(t => `  - ${t.tag}: ${t.error.message}`).sort().join('\n');
  return new graphql.GraphQLError(`An error occured while resolving relationship fields.\n${s}`, {
    extensions: {
      code: 'KS_RELATIONSHIP_ERROR',
      debug: things.map(t => ({
        stacktrace: t.error.stack,
        message: t.error.message
      }))
    }
  });
};
const accessReturnError = things => {
  const s = things.map(t => `  - ${t.tag}: Returned: ${t.returned}. Expected: boolean.`).join('\n');
  return new graphql.GraphQLError(`Invalid values returned from access control function.\n${s}`, {
    extensions: {
      code: 'KS_ACCESS_RETURN_ERROR'
    }
  });
};

// FIXME: In an upcoming PR we will use these args to construct a better
// error message, so leaving the, here for now. - TL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const limitsExceededError = args => new graphql.GraphQLError('Your request exceeded server limits', {
  extensions: {
    code: 'KS_LIMITS_EXCEEDED'
  }
});
const filterAccessError = _ref => {
  let {
    operation,
    fieldKeys
  } = _ref;
  return new graphql.GraphQLError(`You do not have access to perform '${operation}' operations on the fields ${JSON.stringify(fieldKeys)}.`, {
    extensions: {
      code: 'KS_FILTER_DENIED'
    }
  });
};

exports.accessDeniedError = accessDeniedError;
exports.accessReturnError = accessReturnError;
exports.extensionError = extensionError;
exports.filterAccessError = filterAccessError;
exports.humanize = humanize;
exports.limitsExceededError = limitsExceededError;
exports.prismaError = prismaError;
exports.relationshipError = relationshipError;
exports.resolverError = resolverError;
exports.userInputError = userInputError;
exports.validationFailureError = validationFailureError;
