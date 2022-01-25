import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Layout, ModuleDetail, QueryResult } from "../components";

export const GET_MODULE_PAGE = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({ moduleId, trackId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_PAGE, {
    variables: { trackId, moduleId },
  });

  return (
    <Layout fullWidth={true}>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
