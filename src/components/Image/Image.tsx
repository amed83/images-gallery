import { Grid } from "@material-ui/core";
import { FC, memo } from "react";
import { ImageProps } from "../Dashboard/Dashboard";

interface PageProps extends ImageProps {
  handleOpenModal: (id: string) => void;
}

export const Image: FC<PageProps> = memo(({ id, handleOpenModal, url }) => {
  return (
    <Grid
      item
      style={{ cursor: "pointer" }}
      onClick={() => handleOpenModal(id)}
    >
      <img src={url} alt="img" />
    </Grid>
  );
});
