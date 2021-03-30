import { useState, FC, useEffect, useCallback } from "react";

import { Image } from "../Image/Image";
import { ApplyQueries, useGridStyles } from "./Style";
import { GridList } from "@material-ui/core";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

export interface ImageProps {
  download_url: string;
  id: string;
  isLoading?: boolean;
}

export const Dashboard: FC<{}> = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [fullWidthImg, setFullWidthImg] = useState<string | undefined>(
    undefined
  );
  const [pageIndex, setPageIndex] = useState<number>(1);

  const gridClasses = useGridStyles();

  const handlePageIndex = () => {
    setPageIndex(pageIndex + 1);
  };

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageIndex}&limit=4`)
      .then((response) => response.json())
      .then((response) => {
        const copyOfLastImg = {
          ...response[response.length - 1],
          id: response[response.length - 1] + "B",
        };
        response.push(copyOfLastImg);
        return setImages(
          response.map((img: ImageProps) => ({ ...img, isLoading: true }))
        );
      });
  }, [pageIndex]);

  const handleCloseModal = () => {
    setFullWidthImg(undefined);
  };

  const handleOpenModal = useCallback(
    (id: string) => {
      setFullWidthImg(images.filter((img) => img.id === id)[0].download_url);
    },
    [images]
  );

  const handleLoading = useCallback(
    (id: string) => {
      setImages(
        images.map((img) => {
          if (img.id === id) {
            return {
              ...img,
              isLoading: false,
            };
          }
          return img;
        })
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
        {images.length > 0 &&
          images.map(({ id, download_url, isLoading }, index) => {
            return (
              <Image
                id={id}
                key={id}
                handleOpenModal={handleOpenModal}
                handleLoading={handleLoading}
                handlePageIndex={
                  index === images.length - 1 ? handlePageIndex : undefined
                }
                download_url={download_url}
                isLoading={isLoading}
                isLoadMore={index === images.length - 1}
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
