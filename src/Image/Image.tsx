import { GridListTile, CircularProgress, Box } from "@material-ui/core";
import { FC, memo, useState } from "react";
import { ImageProps } from "../Dashboard/Dashboard";
import {
  useGridListTileStyles,
  useLoadMoreImage,
  useLoadMoreImgContainer,
} from "./Style";

interface PageProps extends ImageProps {
  handleOpenModal: (id: string) => void;
  handlePageIndex?: () => void;
  style?: {};
  isLoadMore?: boolean;
  totalImages: number;
}

export const Image: FC<PageProps> = (props) => {
  const gridItemClasses = useGridListTileStyles();

  const loadMoreImgContainerClasses = useLoadMoreImgContainer();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadMoreImgClasses = useLoadMoreImage(isLoading)();
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
          display={isLoading ? "none" : "inline"}
          textAlign="center"
        >
          <h3 style={{ color: "white" }}>{props.totalImages}More Pictures </h3>
        </Box>
        <img
          src={props.download_url}
          alt=""
          onLoad={() => setIsLoading(false)}
          style={{
            objectFit: "cover",
            opacity: "0.5",
            display: isLoading ? "none" : "inline",
          }}
        />
        <CircularProgress
          style={{ display: isLoading ? "block" : "none" }}
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
        style={{ display: isLoading ? "none" : "inline" }}
        src={props.download_url}
        alt="img"
        onLoad={() => setIsLoading(false)}
      />
      <CircularProgress
        style={{ display: isLoading ? "block" : "none" }}
      ></CircularProgress>
    </GridListTile>
  );
};
