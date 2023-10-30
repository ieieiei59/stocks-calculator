import { Button, Grid, Stack, TextField, Typography } from "@suid/material";
import ArrowCircleDownIcon from "@suid/icons-material/ArrowCircleDown";
import { Show, createSignal } from "solid-js";

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
    const hours = Math.floor(diffAsMinute / 60);
    const minutes = diffAsMinute % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  toHourString(): string {
    return `${this.diffAsMinute / 60}`;
  }

  private get diffAsMinute(): number {
    return this.to.toMinuteNumber() - this.from.toMinuteNumber();
  }
}

type LabeledTextProps = { label: string; value: string };
function LabeledText({ label, value }: LabeledTextProps) {
  return (
    <Grid container spacing={1}>
      <Grid item>{label}:</Grid>
      <Grid item>{value}</Grid>
    </Grid>
  );
}

function HourCalculator() {
  const [getBeginTime, setBeginTime] = createSignal("");
  const [getEndTime, setEndTime] = createSignal("");
  const [getResult, setResult] = createSignal("");

  const resetForm = () => {
    setBeginTime("");
    setEndTime("");
    setResult("");
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

            setResult(`${timeDiff.toHourString()} (${timeDiff.toString()})`);
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
        <Stack alignItems="center">
          <ArrowCircleDownIcon />
        </Stack>
        <Show when={getResult().length > 0}>
          <Stack>
            <Typography color="silver">
              <LabeledText label="開始時間" value={getBeginTime()} />
            </Typography>
            <Typography color="silver">
              <LabeledText label="終了時間" value={getEndTime()} />
            </Typography>
            <Typography fontWeight="bold">
              <LabeledText label="稼働時間" value={getResult()} />
            </Typography>
          </Stack>
        </Show>
      </Stack>
    </Stack>
  );
}

export default HourCalculator;
