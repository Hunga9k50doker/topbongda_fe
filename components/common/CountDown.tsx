import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import Countdown from "react-countdown";

interface CountdownProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  formatted?: any;
  completed?: boolean;
  shorter?: boolean;
  className?: string;
  date: any;
}
const CountdownCustom = ({ date }: CountdownProps) => {
  return (
    <Countdown
      className="text-green-500"
      date={date}
      renderer={renderCountdown}
    />
  );
};

export default dynamic(() => Promise.resolve(CountdownCustom), {
  ssr: false,
  loading: () => <Skeleton height={16} width={60} />,
});

const renderCountdown = (props: any) => {
  const { days, formatted, completed, shorter } = props;
  if (completed) {
    return <></>;
  } else {
    return (
      <div className="highlight-text font-bold text-primary text-countdown">
        {days > 0 ? (
          <span>
            {days}
            <span className="short hidden">N</span>
            <span className="long">ngày</span>&nbsp;
            {formatted.hours}:{formatted.minutes}
            <span className="long">:{formatted.seconds}</span>
          </span>
        ) : (
          <span>
            {formatted.hours}:{formatted.minutes}:{formatted.seconds}
          </span>
        )}
      </div>
    );
  }
};
