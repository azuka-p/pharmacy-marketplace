import { memo, useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

interface TimerDownProps {
  countDownValue: number;
  localStorageName: string;
  setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const TimerDown = (props: TimerDownProps) => {
  const localStorageName = `${props.localStorageName}_end_date`;
  const [timer, setTimer] = useState({
    date: Date.now(),
    delay: props.countDownValue,
  });

  const renderer = ({ formatted }: CountdownRenderProps) => {
    return (
      <div className={`text-primBlue ${props.className}`}>
        {`${formatted.minutes}:${formatted.seconds}`}
      </div>
    );
  };

  useEffect(() => {
    const storedTimer = localStorage.getItem(localStorageName);
    if (storedTimer != null && !isNaN(JSON.parse(storedTimer))) {
      const currTime = Date.now();
      const delta = parseInt(storedTimer, 10) - currTime;

      if (delta > props.countDownValue) {
        if (JSON.parse(storedTimer).length > 0) {
          localStorage.removeItem(localStorageName);
        }
      } else {
        setTimer({
          date: currTime,
          delay: delta,
        });
      }
    }
  }, []);

  return (
    <div>
      <Countdown
        date={timer.date + timer.delay}
        renderer={renderer}
        onStart={() => {
          if (localStorage.getItem(localStorageName) == null) {
            localStorage.setItem(
              localStorageName,
              JSON.stringify(timer.date + timer.delay),
            );
          }
        }}
        onComplete={() => {
          props.setIsTimerOn(false);
          if (localStorage.getItem(localStorageName) != null) {
            localStorage.removeItem(localStorageName);
          }
        }}
        zeroPadTime={2}
      />
    </div>
  );
};

export default memo(TimerDown);
