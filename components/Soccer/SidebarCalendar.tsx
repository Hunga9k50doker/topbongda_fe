import React, { useEffect } from "react";
import viLocale from "@fullcalendar/core/locales/vi";
import { MatchScheduleContext } from "@/context/MatchScheduleContext/MatchScheduleContext";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import queryString from "query-string";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

function SidebarCalendar() {
  const { query, isLoadingCalender, eventsCalendar, setMonth } =
    React.useContext(MatchScheduleContext);
  const router = useRouter();
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onRedirect = (e: any) => {
    router.push(`${e.event._def.url}&status=ALL`);
  };

  //add href to day grid number to fix score SEO
  useEffect(() => {
    const listDayNumber = document.querySelectorAll(".fc-daygrid-day-number");
    if (listDayNumber.length) {
      listDayNumber.forEach((item: any) => {
        item.setAttribute(
          "href",
          `/lich-thi-dau?${queryString.stringify(query)}`
        );
      });
    }
  }, []);

  return (
    <Accordion
      sx={{ mb: 1 }}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" fontSize="small" />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <p className="text-sm font-bold text-primary uppercase">
          Lịch thi đấu theo tháng
        </p>
      </AccordionSummary>
      <AccordionDetails>
        <NewStyle>
          <Spin spinning={isLoadingCalender}>
            <FullCalendar
              eventClick={(e) => {
                e.jsEvent.stopPropagation();
                e.jsEvent.preventDefault();
                onRedirect(e);
              }}
              locale={viLocale}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              initialDate={query?.dt?.toString() || new Date()}
              headerToolbar={{
                start: "",
                center: "",
                end: "",
              }}
              footerToolbar={{
                start: "today",
                center: "title",
                end: "prev,next",
              }}
              titleFormat={{ month: "numeric", year: "numeric" }}
              height={420}
              events={eventsCalendar}
              datesSet={(arg: any) => {
                setMonth(arg);
              }}
              nowIndicator={true}
              editable={true}
              selectable={true}
              selectMirror={true}
            />
          </Spin>
        </NewStyle>
      </AccordionDetails>
    </Accordion>
  );
}

export default React.memo(SidebarCalendar);

const NewStyle = styled("div")(({ theme }: any) => ({
  "& .fc .fc-event-title-container": {
    textAlign: "center",
  },
  "& .fc .fc-h-event": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .fc .fc-toolbar-title": {
    fontSize: "16px",
  },
  ".fc-day-today": {
    backgroundColor: "#ccc",
  },
  "& .fc .fc-button-group": {
    gap: "4px",
  },

  "& .fc button": {
    overflow: "hidden",
    borderRadius: "6px",
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 20%)",
    "& .fc:hover": {
      opacity: 0.8,
    },
  },

  "& .fc .fc-header-toolbar": {
    margin: "0 !important",
  },
  "& .fc .fc-button-primary": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .fc .fc-button-primary:disabled": {
    backgroundColor: theme.palette.primary.main,
  },

  "& .fc .fc-button-primary:hover": {
    opacity: 0.8,
  },
  "& .fc a": {
    color: `${theme.palette.text.primary} !important`,
  },
  "& .ant-spin-dot-item": {
    backgroundColor: `${theme.palette.custom.lightGreen} !important`,
  },
}));
