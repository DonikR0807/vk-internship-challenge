import { Pagination, PaginationProps, useMediaQuery, useTheme } from "@mui/material";

function PagePagination({ page, count, onChange, ...props }: PaginationProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Pagination
      page={page}
      onChange={onChange}
      sx={{
        padding: {
          xs: "24px 0 0 0",
          sm: "24px 24px 0 24px"
        },
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        alignItems: "flex-end",
      }}
      count={count}
      variant="outlined"
      shape="rounded"
      color="primary"
      size={matches ? "large" : "small"}
      {...props}
    ></Pagination>
  );
}

export default PagePagination;
