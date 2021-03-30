import { makeStyles, useMediaQuery } from "@material-ui/core";

export const useGridStyles = makeStyles({
  gridList: {
    width: "80%",
    height: 450,
  },
});

export const ApplyQueries = () => {
  const matchSm = useMediaQuery("(max-width:600px)");
  const matchMd = useMediaQuery("(max-width:960px)");

  if (matchSm) {
    return 1;
  }
  if (matchMd) {
    return 2;
  }
  return 3;
};
