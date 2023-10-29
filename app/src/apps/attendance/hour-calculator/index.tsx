import { Button, Stack, TextField } from "@suid/material";
import ArrowCircleDownIcon from "@suid/icons-material/ArrowCircleDown";
import { createSignal } from "solid-js";

class Time {
  readonly hour: number;
  readonly minute: number;

  constructor(timeStr: string) {
    const splittedTimeStr = timeStr.split(":");
    if (splittedTimeStr.length !== 2) {
      throw new Error("invalid time string error");
    }

    this.hour = Number(splittedTimeStr[0]);
    this.minute = Number(splittedTimeStr[1]);
  }

  toMinuteNumber(): number {
    return this.hour * 60 + this.minute;
  }
}

class TimeDiff {
  constructor(readonly from: Time, readonly to: Time) {}

  toString(): string {
    const diffAsMinute = this.to.toMinuteNumber() - this.from.toMinuteNumber();

    return `${Math.floor(diffAsMinute / 60)}:${diffAsMinute % 60}`;
  }
}

function HourCalculator() {
  const [getBeginTime, setBeginTime] = createSignal("");
  const [getEndTime, setEndTime] = createSignal("");

  const resetForm = () => {
    setBeginTime("");
    setEndTime("");
  };

  return (
    <Stack width="100%">
      <h1>勤務時間計算</h1>
      <Stack spacing={2} alignItems="center" width="100%">
        <form
          style="width: 100%;"
          autocomplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            console.log({
              start: getBeginTime(),
              end: getEndTime(),
            });
            const beginTime = new Time(getBeginTime());
            const endTime = new Time(getEndTime());

            const timeDiff = new TimeDiff(beginTime, endTime);

            alert(timeDiff.toString());
          }}
        >
          <Stack spacing={2} width="100%">
            <Stack spacing={1}>
              <Stack>
                <TextField
                  type="time"
                  label="開始時間"
                  value={getBeginTime()}
                  onChange={({ target: { value } }) => {
                    setBeginTime(() => value);
                  }}
                />
              </Stack>
              <Stack alignItems="center">
                <ArrowCircleDownIcon />
              </Stack>
              <Stack>
                <TextField
                  type="time"
                  label="終了時間"
                  value={getEndTime()}
                  onChange={({ target: { value } }) => {
                    setEndTime(() => value);
                  }}
                />
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  resetForm();
                }}
              >
                リセット
              </Button>
              <Button type="submit" variant="contained">
                計算！
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}

export default HourCalculator;
