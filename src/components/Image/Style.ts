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
