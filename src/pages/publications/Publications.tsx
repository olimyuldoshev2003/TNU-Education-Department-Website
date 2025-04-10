import { useTranslation } from "react-i18next";
import EachPublication from "../../components/eachPublication/EachPublication";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAndSearchPublications } from "../../api/api";

const Publications = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loadingPublications = useAppSelector(
    (state) => state.states.loadingPublications
  );
  const publications = useAppSelector((state) => state.states.publications);

  // Pagination state
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getAndSearchPublications({
        departmentName: searchValue,
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, searchValue, page, rowsPerPage]);

  return (
    <div className="publications_component dark:bg-[#091220] duration-300 py-6">
      <section className="publications mt-8 max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
          {t("publications.t1")} {publications?.items || 0}{" "}
          {t("publications.t2")}
        </h1>

        <div className="for_search_and_filter">
          <div className="for_input w-1/2 mx-auto mt-2">
            <Input
              type="search"
              label="Search the publications"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(e.target.value);
              }}
              className="dark:text-white"
            />
          </div>
        </div>

        <div className="block_of_publications flex flex-wrap justify-center gap-3 mt-5">
          {loadingPublications ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : publications?.data?.length ? (
            publications.data
              .filter((item: any) =>
                item.publicationName
                  .toLowerCase()
                  .includes(searchValue.trim().toLowerCase())
              )
              .map((item: any) => (
                <EachPublication
                  key={item.id}
                  id={item.id}
                  publicationImg={item.publicationImg}
                  publicationName={item.publicationName}
                />
              ))
          ) : (
            <h1 className="dark:text-white">Publications not found</h1>
          )}
        </div>

        <div className="for_pagionation_of_publications flex justify-center dark:bg-white mt-6">
          <TablePagination
            component="div"
            count={publications?.items || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </section>
    </div>
  );
};

export default Publications;
