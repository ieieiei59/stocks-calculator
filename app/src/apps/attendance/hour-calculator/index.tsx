import { Button, Stack, TextField } from "@suid/material";
import ArrowCircleDownIcon from "@suid/icons-material/ArrowCircleDown";

function HourCalculator() {
  return (
    <Stack width="100%">
      <h1>勤務時間計算</h1>
      <Stack spacing={2} alignItems="center" width="100%">
        <form
          style="width: 100%;"
          autocomplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            alert(JSON.stringify(event));
          }}
        >
          <Stack spacing={2} width="100%">
            <Stack spacing={1}>
              <Stack>
                <TextField type="time" label="開始時間" />
              </Stack>
              <Stack alignItems="center">
                <ArrowCircleDownIcon />
              </Stack>
              <Stack>
                <TextField type="time" label="終了時間" />
              </Stack>
            </Stack>

            <Stack spacing={1}>
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
