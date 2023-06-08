import { jsx, Stack, Text } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription } from '@keystone-ui/fields';
import { useRef, useMemo } from 'react';
import bytes from 'bytes';
import { Button } from '@keystone-ui/button';

/** @jsxRuntime classic */
function Field(_ref) {
  let {
    autoFocus,
    field,
    value,
    onChange
  } = _ref;
  const inputRef = useRef(null);
  const errorMessage = createErrorMessage(value);
  const onUploadChange = _ref2 => {
    let {
      currentTarget: {
        validity,
        files
      }
    } = _ref2;
    const file = files === null || files === void 0 ? void 0 : files[0];
    if (!file) return; // bail if the user cancels from the file browser
    onChange === null || onChange === void 0 ? void 0 : onChange({
      kind: 'upload',
      data: {
        file,
        validity
      },
      previous: value
    });
  };

  // Generate a random input key when the value changes, to ensure the file input is unmounted and
  // remounted (this is the only way to reset its value and ensure onChange will fire again if
  // the user selects the same file again)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputKey = useMemo(() => Math.random(), [value]);
  return jsx(FieldContainer, {
    as: "fieldset"
  }, jsx(FieldLabel, {
    as: "legend"
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), jsx(FileView, {
    errorMessage: errorMessage,
    value: value,
    onChange: onChange,
    inputRef: inputRef
  }), jsx("input", {
    css: {
      display: 'none'
    },
    autoComplete: "off",
    autoFocus: autoFocus,
    ref: inputRef,
    key: inputKey,
    name: field.path,
    onChange: onUploadChange,
    type: "file",
    disabled: onChange === undefined,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`
  }));
}
function FileView(_ref3) {
  let {
    errorMessage,
    value,
    onChange,
    inputRef
  } = _ref3;
  return value.kind === 'from-server' || value.kind === 'upload' ? jsx(Stack, {
    gap: "small",
    across: true,
    align: "center"
  }, onChange && jsx(Stack, {
    gap: "small"
  }, value.kind === 'from-server' && jsx(Stack, {
    padding: "xxsmall",
    gap: "xxsmall"
  }, jsx(Text, {
    size: "small"
  }, jsx("a", {
    href: value.data.src,
    target: "_blank"
  }, `${value.data.filename}`)), jsx(Text, {
    size: "small"
  }, "Size: ", bytes(value.data.filesize))), value.kind === 'upload' && jsx(Stack, {
    padding: "xxsmall",
    gap: "xxsmall"
  }, jsx(Text, {
    size: "small",
    paddingBottom: "xsmall"
  }, "File linked, save to complete upload"), jsx(Text, {
    size: "small"
  }, "Size: ", bytes(value.data.file.size))), jsx(Stack, {
    across: true,
    gap: "small",
    align: "center"
  }, jsx(Button, {
    size: "small",
    onClick: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
    }
  }, "Change"), value.kind === 'from-server' && jsx(Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange({
        kind: 'remove',
        previous: value
      });
    }
  }, "Remove"), value.kind === 'upload' && jsx(Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange(value.previous);
    }
  }, "Cancel"), errorMessage && jsx("span", {
    css: {
      display: 'block',
      marginTop: '8px',
      color: 'red'
    }
  }, errorMessage)))) : jsx(Stack, {
    gap: "small"
  }, jsx(Stack, {
    css: {
      alignItems: 'center'
    },
    gap: "small",
    across: true
  }, jsx(Button, {
    size: "small",
    disabled: onChange === undefined,
    onClick: () => {
      var _inputRef$current2;
      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.click();
    }
  }, "Upload File"), value.kind === 'remove' && value.previous && jsx(Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      if (value.previous !== undefined) {
        onChange === null || onChange === void 0 ? void 0 : onChange(value === null || value === void 0 ? void 0 : value.previous);
      }
    }
  }, "Undo removal")));
}
function createErrorMessage(value) {
  if (value.kind === 'upload') {
    return validateFile(value.data);
  }
}
function validateFile(_ref4) {
  let {
    validity
  } = _ref4;
  if (!validity.valid) {
    return 'Something went wrong, please reload and try again.';
  }
}

/** @jsxRuntime classic */
const Cell = _ref => {
  let {
    item,
    field
  } = _ref;
  const data = item[field.path];
  if (!data) return null;
  return jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      height: 24,
      lineHeight: 0,
      width: 24
    }
  }, data.filename);
};
const CardValue = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  const data = item[field.path];
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), data && data.filename);
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} {
        url
        filename
        filesize
      }`,
    defaultValue: {
      kind: 'empty'
    },
    deserialize(item) {
      const value = item[config.path];
      if (!value) return {
        kind: 'empty'
      };
      return {
        kind: 'from-server',
        data: {
          src: value.url,
          filename: value.filename,
          ref: value.ref,
          filesize: value.filesize,
          storage: value.storage
        }
      };
    },
    validate(value) {
      return value.kind !== 'upload' || validateFile(value.data) === undefined;
    },
    serialize(value) {
      if (value.kind === 'upload') {
        return {
          [config.path]: {
            upload: value.data.file
          }
        };
      }
      if (value.kind === 'remove') {
        return {
          [config.path]: null
        };
      }
      return {};
    }
  };
};

export { CardValue, Cell, Field, controller };
