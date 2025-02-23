'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('@keystone-6/core/types');
var core = require('@keystone-6/core');
var cuid = require('cuid');
var cloudinary = require('cloudinary');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var cuid__default = /*#__PURE__*/_interopDefault(cuid);
var cloudinary__default = /*#__PURE__*/_interopDefault(cloudinary);

function uploadStream(stream, options) {
  return new Promise((resolve, reject) => {
    const cloudinaryStream = cloudinary__default["default"].v2.uploader.upload_stream(options, (error, result) => {
      if (error || !result) {
        return reject(error);
      }
      resolve(result);
    });
    stream.pipe(cloudinaryStream);
  });
}
class CloudinaryAdapter {
  constructor(_ref) {
    let {
      cloudName,
      apiKey,
      apiSecret,
      folder
    } = _ref;
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('CloudinaryAdapter requires cloudName, apiKey, and apiSecret');
    }
    this.cloudName = cloudName;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.folder = folder || undefined;
  }

  /**
   * Params: { stream, filename, id }
   */
  save(_ref2) {
    let {
      stream,
      filename,
      id
    } = _ref2;
    // Push to cloudinary
    return uploadStream(stream, {
      public_id: id,
      folder: this.folder,
      // Auth
      api_key: this.apiKey,
      api_secret: this.apiSecret,
      cloud_name: this.cloudName
    }).then(result => ({
      // Return the relevant data for the File api
      id,
      filename,
      _meta: result
    }));
  }

  /**
   * Deletes the given file from cloudinary
   * @param file File field data
   * @param options Delete options passed to cloudinary.
   *                For available options refer to the [Cloudinary destroy API](https://cloudinary.com/documentation/image_upload_api_reference#destroy_method).
   */
  delete(file) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const destroyOptions = {
      // Auth
      api_key: this.apiKey,
      api_secret: this.apiSecret,
      cloud_name: this.cloudName,
      ...options
    };
    return new Promise((resolve, reject) => {
      if (file) {
        // @ts-ignore
        cloudinary__default["default"].v2.uploader.destroy(file._meta.public_id, destroyOptions, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      } else {
        reject(new Error("Missing required argument 'file'."));
      }
    });
  }
  publicUrl(file) {
    var _file$_meta;
    return (file === null || file === void 0 ? void 0 : (_file$_meta = file._meta) === null || _file$_meta === void 0 ? void 0 : _file$_meta.secure_url) || null;
  }
  publicUrlTransformed(file) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!file._meta) {
      return null;
    }
    const {
      prettyName,
      ...transformation
    } = options;
    // No formatting options provided, return the publicUrl field
    if (!Object.keys(transformation).length) {
      return this.publicUrl(file);
    }
    const {
      public_id,
      format
    } = file._meta;

    // Docs: https://github.com/cloudinary/cloudinary_npm/blob/439586eac73cee7f2803cf19f885e98f237183b3/src/utils.coffee#L472 (LOL)
    // @ts-ignore
    return cloudinary__default["default"].url(public_id, {
      type: 'upload',
      format,
      secure: true,
      url_suffix: prettyName,
      transformation,
      cloud_name: this.cloudName
    });
  }
}

const CloudinaryImageFormat = core.graphql.inputObject({
  name: 'CloudinaryImageFormat',
  description: 'Mirrors the formatting options [Cloudinary provides](https://cloudinary.com/documentation/image_transformation_reference).\n' + 'All options are strings as they ultimately end up in a URL.',
  fields: {
    prettyName: core.graphql.arg({
      description: ' Rewrites the filename to be this pretty string. Do not include `/` or `.`',
      type: core.graphql.String
    }),
    width: core.graphql.arg({
      type: core.graphql.String
    }),
    height: core.graphql.arg({
      type: core.graphql.String
    }),
    crop: core.graphql.arg({
      type: core.graphql.String
    }),
    aspect_ratio: core.graphql.arg({
      type: core.graphql.String
    }),
    gravity: core.graphql.arg({
      type: core.graphql.String
    }),
    zoom: core.graphql.arg({
      type: core.graphql.String
    }),
    x: core.graphql.arg({
      type: core.graphql.String
    }),
    y: core.graphql.arg({
      type: core.graphql.String
    }),
    format: core.graphql.arg({
      type: core.graphql.String
    }),
    fetch_format: core.graphql.arg({
      type: core.graphql.String
    }),
    quality: core.graphql.arg({
      type: core.graphql.String
    }),
    radius: core.graphql.arg({
      type: core.graphql.String
    }),
    angle: core.graphql.arg({
      type: core.graphql.String
    }),
    effect: core.graphql.arg({
      type: core.graphql.String
    }),
    opacity: core.graphql.arg({
      type: core.graphql.String
    }),
    border: core.graphql.arg({
      type: core.graphql.String
    }),
    background: core.graphql.arg({
      type: core.graphql.String
    }),
    overlay: core.graphql.arg({
      type: core.graphql.String
    }),
    underlay: core.graphql.arg({
      type: core.graphql.String
    }),
    default_image: core.graphql.arg({
      type: core.graphql.String
    }),
    delay: core.graphql.arg({
      type: core.graphql.String
    }),
    color: core.graphql.arg({
      type: core.graphql.String
    }),
    color_space: core.graphql.arg({
      type: core.graphql.String
    }),
    dpr: core.graphql.arg({
      type: core.graphql.String
    }),
    page: core.graphql.arg({
      type: core.graphql.String
    }),
    density: core.graphql.arg({
      type: core.graphql.String
    }),
    flags: core.graphql.arg({
      type: core.graphql.String
    }),
    transformation: core.graphql.arg({
      type: core.graphql.String
    })
  }
});
// TODO: lvalue type required by pnpm :(
const outputType = core.graphql.object()({
  name: 'CloudinaryImage_File',
  fields: {
    id: core.graphql.field({
      type: core.graphql.ID
    }),
    // path: types.field({ type: types.String }),
    filename: core.graphql.field({
      type: core.graphql.String
    }),
    originalFilename: core.graphql.field({
      type: core.graphql.String
    }),
    mimetype: core.graphql.field({
      type: core.graphql.String
    }),
    encoding: core.graphql.field({
      type: core.graphql.String
    }),
    publicUrl: core.graphql.field({
      type: core.graphql.String
    }),
    publicUrlTransformed: core.graphql.field({
      args: {
        transformation: core.graphql.arg({
          type: CloudinaryImageFormat
        })
      },
      type: core.graphql.String,
      resolve(rootVal, args) {
        return rootVal.publicUrlTransformed(args);
      }
    })
  }
});
const cloudinaryImage = _ref => {
  let {
    cloudinary,
    ...config
  } = _ref;
  return meta => {
    var _config$db;
    if (config.isIndexed === 'unique') {
      throw Error("isIndexed: 'unique' is not a supported option for field type cloudinaryImage");
    }
    const adapter = new CloudinaryAdapter(cloudinary);
    const inputArg = core.graphql.arg({
      type: core.graphql.Upload
    });
    const resolveInput = async uploadData => {
      if (uploadData === null) {
        return meta.provider === 'postgresql' || meta.provider === 'mysql' ? 'DbNull' : null;
      }
      if (uploadData === undefined) {
        return undefined;
      }
      const {
        createReadStream,
        filename: originalFilename,
        mimetype,
        encoding
      } = await uploadData;
      const stream = createReadStream();
      if (!stream) {
        // TODO: FIXME: Handle when stream is null. Can happen when:
        // Updating some other part of the item, but not the file (gets null
        // because no File DOM element is uploaded)
        return undefined;
      }
      const {
        id,
        filename,
        _meta
      } = await adapter.save({
        stream,
        filename: originalFilename,
        id: cuid__default["default"]()
      });
      return {
        id,
        filename,
        originalFilename,
        mimetype,
        encoding,
        _meta
      };
    };
    return types.jsonFieldTypePolyfilledForSQLite(meta.provider, {
      ...config,
      __ksTelemetryFieldTypeName: '@keystone-6/cloudinary',
      input: {
        create: {
          arg: inputArg,
          resolve: resolveInput
        },
        update: {
          arg: inputArg,
          resolve: resolveInput
        }
      },
      output: core.graphql.field({
        type: outputType,
        resolve(_ref2) {
          let {
            value
          } = _ref2;
          if (value === null) {
            return null;
          }
          const val = value;
          return {
            publicUrl: adapter.publicUrl(val),
            publicUrlTransformed: _ref3 => {
              let {
                transformation
              } = _ref3;
              return adapter.publicUrlTransformed(val, transformation !== null && transformation !== void 0 ? transformation : {});
            },
            ...val
          };
        }
      }),
      views: '@keystone-6/cloudinary/views'
    }, {
      map: (_config$db = config.db) === null || _config$db === void 0 ? void 0 : _config$db.map
    });
  };
};

exports.cloudinaryImage = cloudinaryImage;
exports.outputType = outputType;
