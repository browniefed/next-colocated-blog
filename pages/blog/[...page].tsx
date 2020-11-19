import dynamic from "next/dynamic";
import Layout from "../../layout";
import { getTutorialPaths, TUTORIAL_PATH } from "../../lib/mdx";

export async function getStaticPaths() {
  const tutorialPaths = await getTutorialPaths();
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
