import { useState, FC, useEffect, useCallback, useReducer } from "react";

import { Image } from "../Image/Image";
import { ApplyQueries, useGridStyles } from "./Style";
import { GridList } from "@material-ui/core";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

export interface ImageProps {
  download_url: string;
  id: string;
}

interface DashboardProps {
  data: ImageProps[];
  totalImages: number;
}

export const Dashboard: FC<{}> = () => {
  const [images, setImages] = useState<DashboardProps>({
    data: [],
    totalImages: 8,
  });
  const [fullWidthImg, setFullWidthImg] = useState<string | undefined>(
    undefined
  );
  const [pageIndex, setPageIndex] = useState<number>(1);

  const imagesForPage = 4;

  const gridClasses = useGridStyles();

  const handlePageIndex = () => {
    setPageIndex(pageIndex + 1);
  };

  useEffect(() => {
    fetch(
      `https://picsum.photos/v2/list?page=${pageIndex}&limit=${imagesForPage}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (images.totalImages - imagesForPage > 0) {
          const copyOfLastImg = {
            ...response[response.length - 1],
            id: response[response.length - 1].id + "B",
          };
          response.push(copyOfLastImg);
        }
        setImages({
          data: response,
          totalImages: images.totalImages - imagesForPage,
        });
      });
  }, [pageIndex]);

  const handleCloseModal = () => {
    setFullWidthImg(undefined);
  };

  const handleOpenModal = useCallback(
    (id: string) => {
      setFullWidthImg(
        images.data.filter((img) => img.id === id)[0].download_url
      );
    },
    [images]
  );
  return (
    <>
      <GridList
        className={gridClasses.gridList}
        cols={ApplyQueries()}
        spacing={9}
      >
        {images.data.length > 0 &&
          images.data.map(({ id, download_url }, index) => {
            return (
              <Image
                id={id}
                key={id}
                handleOpenModal={handleOpenModal}
                handlePageIndex={
                  index === images.data.length - 1 ? handlePageIndex : undefined
                }
                download_url={download_url}
                isLoadMore={
                  index === images.data.length - 1 && images.totalImages > 0
                }
                totalImages={images.totalImages}
              />
            );
          })}
      </GridList>
      <ModalWrapper
        handleCloseModal={handleCloseModal}
        fullWidthImgUrl={fullWidthImg}
      />
    </>
  );
};
