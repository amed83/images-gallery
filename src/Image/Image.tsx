import { GridListTile, CircularProgress, Box, Grid } from "@material-ui/core";
import { FC, memo } from "react";
import { ImageProps } from "../Dashboard/Dashboard";
import {
  useGridListTileStyles,
  useLoadMoreImage,
  useLoadMoreImgContainer,
} from "./Style";

interface PageProps extends ImageProps {
  handleOpenModal: (id: string) => void;
  handleLoading: (id: string) => void;
  handlePageIndex?: () => void;
  style?: {};
  isLoadMore?: boolean;
}

export const Image: FC<PageProps> = memo((props) => {
  const gridItemClasses = useGridListTileStyles();
  const loadMoreImgClasses = useLoadMoreImage(props)();
  const loadMoreImgContainerClasses = useLoadMoreImgContainer();

  if (props.isLoadMore) {
    return (
      <GridListTile
        style={{ cursor: "pointer", ...props.style }}
        className={loadMoreImgClasses.root}
        onClick={() => props.handlePageIndex?.()}
      >
        <Box
          className={loadMoreImgContainerClasses.root}
          position="absolute"
          left="50%"
          top="50%"
          display={props.isLoading ? "none" : "inline"}
          textAlign="center"
        >
          <h3 style={{ color: "white" }}>Load More Pictures </h3>
        </Box>
        <img
          src={props.download_url}
          alt=""
          onLoad={() => props.handleLoading(props.id)}
          style={{
            objectFit: "cover",
            opacity: "0.5",
            display: props.isLoading ? "none" : "inline",
          }}
        />
        <CircularProgress
          style={{ display: props.isLoading ? "block" : "none" }}
        ></CircularProgress>
      </GridListTile>
    );
  }

  return (
    <GridListTile
      className={gridItemClasses.root}
      onClick={() => props.handleOpenModal(props.id)}
      style={{ cursor: "pointer", ...props.style }}
    >
      <img
        style={{ display: props.isLoading ? "none" : "inline" }}
        src={props.download_url}
        alt="img"
        onLoad={() => props.handleLoading(props.id)}
      />
      <CircularProgress
        style={{ display: props.isLoading ? "block" : "none" }}
      ></CircularProgress>
    </GridListTile>
  );
});
