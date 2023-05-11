var _       = require("underscore")._,
    async   = require("async"),
    fs      = require("fs");

// Helper function to write a given template to a file based on a given
// context
function write_template_to_file(template_path, file_name, context, callback) {
  async.waterfall([

      function read_template_file(next_step) {
          fs.readFile(template_path, {encoding: "utf8"}, next_step);
      },

      function update_file(file_txt, next_step) {
          var template = _.template(file_txt);
          fs.writeFile(file_name, template(context), next_step);
      }

  ], callback);
}

exports.write_template_to_file = write_template_to_file;
