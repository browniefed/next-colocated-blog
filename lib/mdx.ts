import glob from "glob";
import { join, extname, basename } from "path";

export const TUTORIAL_PATH = "content/tutorials";

export const getMDXFiles = (src): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(src + "/**/*.mdx", (err, res) => {
      if (err) {
        reject();
        return;
      }

      resolve(res);
    });
  });
};

export const getPathParam = (path, directory) => {
  const bits = path.replace(directory, "").split("/").filter(Boolean).reverse();
  const [last, ...all] = bits;
  return [basename(last, extname(last)), ...all].reverse();
};

export const getTutorialPaths = async () => {
  const tutorialsDirectory = join(process.cwd(), TUTORIAL_PATH);
  const pathResults = await getMDXFiles(tutorialsDirectory);
  const tutorialPaths = pathResults?.map((path) => {
    return getPathParam(path, tutorialsDirectory);
  });
  return tutorialPaths;
};
