import dynamic from "next/dynamic";
import Layout from "../../layout";
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

export async function getStaticPaths() {
  const tutorialsDirectory = join(process.cwd(), TUTORIAL_PATH);
  const pathResults = await getMDXFiles(tutorialsDirectory);
  const tutorialPaths = pathResults?.map((path) => {
    return getPathParam(path, tutorialsDirectory);
  });

  const paths = tutorialPaths.map((path) => {
    return {
      params: {
        page: path,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const basePath = params.page.join("/");
  const meta = (await import(`../../${TUTORIAL_PATH}/${basePath}.mdx`)).meta;

  return {
    props: {
      basePath,
      meta,
    },
  };
}

function BlogArticle({ basePath, meta }) {
  const Article = dynamic(() => {
    return import(`../../${TUTORIAL_PATH}/${basePath}.mdx`);
  });

  return (
    <Layout meta={meta}>
      <Article />
    </Layout>
  );
}

export default BlogArticle;
