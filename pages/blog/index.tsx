import Link from "next/link";
import glob from "glob";
import { join, extname, basename } from "path";

const TUTORIAL_PATH = "content/tutorials";
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

export async function getStaticProps({ params }) {
  const tutorialPaths = await getTutorialPaths();

  const pathResolves = tutorialPaths.map(async (path) => {
    const basePath = path.join("/");
    const meta = (await import(`../../${TUTORIAL_PATH}/${basePath}.mdx`)).meta;
    return {
      meta,
      basePath,
    };
  });

  const allPaths = await Promise.all(pathResolves);

  return {
    props: {
      posts: allPaths,
    },
  };
}

const Index = ({ posts }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {posts.map(({ basePath, meta }) => {
        return (
          <div>
            <Link href={`/blog/${basePath}`} passHref>
              <a>{meta.title}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
