import { useState, FC, useEffect } from "react";
import { Image } from "../Image/Image";
import { useGridStyles } from "./Style";
import { Grid, Box } from "@material-ui/core";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
export interface ImageProps {
  url: string;
  id: string;
}

export const Dashboard: FC<{}> = () => {
  const regex = /id\/([^/]+)/;
  const [data, setData] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fullWidthImg, setFullWidthImg] = useState<string | undefined>(
    undefined
  );

  const gridClasses = useGridStyles();

  const fetchImages = (count = 10) => {
    const newData = new Array(count).fill("");
    Promise.all(
      newData.map(() => {
        return fetch("https://picsum.photos/200/300");
      })
    ).then((res) => {
      const newData = res.map((el) => {
        const id = el.url.match(regex)[1];
        return {
          url: el.url,
          id,
        };
      });
      setIsLoading(false);
      setData([...data, ...newData]);
    });
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setFullWidthImg(undefined);
  };

  const handleOpenModal = (id: string) => {
    fetch(`https://picsum.photos/id/${id}/1200`).then((res) =>
      setFullWidthImg(res.url)
    );
  };

  return (
    <Box
      justifyContent="center"
      display="flex"
      width="50%"
      flexDirection="column"
    >
      <Box>
        <InfiniteScroll
          dataLength={data.length}
          next={() => fetchImages(10)}
          hasMore={true}
          loader={<div>Loading....</div>}
        >
          <Grid
            container
            className={gridClasses.root}
            spacing={4}
            style={{ overflow: "hidden" }}
          >
            {!isLoading &&
              data.map(({ id, url }, index) => {
                return (
                  <Image
                    id={id}
                    key={uuidv4()}
                    handleOpenModal={handleOpenModal}
                    url={url}
                    isLoadMore={false}
                    totalImages={8}
                  />
                );
              })}
          </Grid>
          <ModalWrapper
            handleCloseModal={handleCloseModal}
            fullWidthImgUrl={fullWidthImg}
          />
        </InfiniteScroll>
      </Box>
    </Box>
  );
};
