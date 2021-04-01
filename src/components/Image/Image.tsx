import { Grid } from "@material-ui/core";
import { FC, memo } from "react";
import { ImageProps } from "../Dashboard/Dashboard";
import { useGridListTileStyles } from "./Style";

interface PageProps extends ImageProps {
  handleOpenModal: (id: string) => void;
  style?: {};
  isLoadMore?: boolean;
  totalImages: number;
}

export const Image: FC<PageProps> = memo(
  ({ style, id, handleOpenModal, url }) => {
    const gridItemClasses = useGridListTileStyles();
    return (
      <Grid
        item
        style={{ cursor: "pointer", ...style, width: "auto", height: "auto" }}
        className={gridItemClasses.root}
        onClick={() => handleOpenModal(id)}
      >
        <img src={url} alt="img" />
      </Grid>
    );
  }
);
