import { makeStyles } from "@material-ui/core";

export const useGridListTileStyles = makeStyles({
  root: {
    "&>div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const useLoadMoreImage = (props: any) =>
  makeStyles({
    root: {
      position: "relative",
      cursor: "pointer",
      "&>div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.isLoading ? "white" : "black",
      },
    },
  });

export const useLoadMoreImgContainer = makeStyles({
  root: {
    transform: "translate(-50%,-50%)",
  },
});
