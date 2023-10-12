import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, Stack } from "@mui/material";
import { MdOutlineFindInPage } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useLocalStorage } from "react-use";
import { updateLoading } from "@/reducers/loadingSlice";
import { store } from "@/store";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalSearch() {
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
  const theme: any = useTheme();
  const refInputSearch: any = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [stoVal, setStoVal, removeStoVal] = useLocalStorage<any>(
    "key-search",
    []
  );
  const [searchHistory, setSearchHistory] = React.useState<string[]>(stoVal);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const router = useRouter();

  const handleDeleteKeySearch = (value: string) => {
    const newKeySearchs = searchHistory.filter((search) => search !== value);
    setStoVal(newKeySearchs);
    setSearchHistory(newKeySearchs);
  };

  const handleClickKeySearch = (value: string) => {
    handleCloseModal();
    router.push(`/tim-kiem/?q=${value}`);
  };

  const handleOnSearch = (e: any, isSearch = false) => {
    e.preventDefault();
    if (isSearch && refInputSearch.current.value?.trim() !== "") {
      const newKeySearchs = stoVal?.splice(0, 4) || [];
      const isHad = newKeySearchs.includes(refInputSearch.current.value);
      if (!isHad) setStoVal([refInputSearch.current.value, ...newKeySearchs]);
      handleCloseModal();
      store.dispatch(updateLoading(true));
      router.push(`/tim-kiem/?q=${refInputSearch.current.value}`);
    }
  };
  const handleClear = () => {
    if (refInputSearch.current.value === "") {
      handleCloseModal();
    } else {
      refInputSearch.current.value = "";
      refInputSearch.current.focus();
    }
  };

  const handleShowMenuSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClear = () => {
    removeStoVal();
    setSearchHistory([]);
  };

  const onKeyUp = (e: any) => {
    if (e.key === "Enter" && refInputSearch.current.value?.trim() !== "") {
      handleOnSearch(e, true);
    }
  };

  return (
    <Dialog
      fullScreen
      open={isOpenModal}
      onClose={handleCloseModal}
      TransitionComponent={Transition}
    >
      <Paper
        component="form"
        onSubmit={handleOnSearch}
        sx={{
          position: "relative",
          paddingRight: "0 !important",
          background: theme.palette.background.paper,
        }}
      >
        <Toolbar sx={{ px: 0 }}>
          <IconButton
            sx={{ p: "10px" }}
            aria-label="menu"
            aria-describedby={id}
            onClick={handleShowMenuSearch}
          ></IconButton>
          <ListItem disablePadding>
            <InputBase
              onKeyUp={onKeyUp}
              inputRef={refInputSearch}
              autoFocus
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm từ khóa..."
            />
          </ListItem>
          <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            onClick={handleClear}
            edge="start"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </Paper>
      <List>
        {searchHistory?.length > 0 && (
          <>
            <ListItem
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <MdOutlineFindInPage className="text-gray-400" />
                  <ListItemText primary="Tìm kiếm gần đây" />
                </Stack>
                <IconButton onClick={onClear} aria-label="button">
                  <FiTrash2 fontSize={20} />
                </IconButton>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                flexWrap={"wrap"}
                gap={1}
              >
                {searchHistory.map((item: string, key: number) => (
                  <Chip
                    key={key}
                    label={item}
                    variant="outlined"
                    onClick={() => handleClickKeySearch(item)}
                    onDelete={() => handleDeleteKeySearch(item)}
                  />
                ))}
              </Stack>
            </ListItem>
            <Divider />
          </>
        )}
      </List>
    </Dialog>
  );
}

export default React.memo(ModalSearch);
