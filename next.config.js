const copyLinkedFiles = require("remark-copy-linked-files");
const path = require("path");
const PATH_NAE = "tutorial_files";
const destinationDir = path.join(__dirname, "public", PATH_NAE);

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [copyLinkedFiles, { destinationDir, staticPath: `/${PATH_NAE}` }],
    ],
  },
});

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
});
