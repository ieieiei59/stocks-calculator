import { Setter, Show, createSignal } from "solid-js";
import "./App.css";
import { Button, Grid, Stack, TextField, Typography } from "@suid/material";
import ArrowCircleDownIcon from "@suid/icons-material/ArrowCircleDown";
import { ZodType, z } from "zod";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";

const positiveInt = z
  .number({ invalid_type_error: "数値を入力してください。" })
  .positive("1以上の数値を入力してください。")
  .int("整数を入力してください。");

type OnChangeHandler = Parameters<typeof TextField>[0]["onChange"];
function onChangeHandler<T>(
  setValue: Setter<T>,
  schema: ZodType<T>,
  setErrorMessage: Setter<string>
): OnChangeHandler {
  return (event) => {
    const parsed = schema.safeParse(Number(event.target.value));
    setErrorMessage(() => "");
    if (!parsed.success) {
      if (event.target.value !== "") {
        const message = parsed.error.issues[0].message;
        setErrorMessage(() => message);
      }

      return setValue((prev) => prev);
    }
    return setValue(() => parsed.data);
  };
}

type ResultItemProps = { label: string; value: number; unit: string };
function ResultItem({ label, value, unit }: ResultItemProps) {
  return (
    <Grid container spacing={1}>
      <Grid item>{label}:</Grid>
      <Grid item>
        {value} {unit}
      </Grid>
    </Grid>
  );
}

function calcResult(
  total?: number,
  quantityPerPallet?: number
): Result | undefined {
  if (!(total && quantityPerPallet)) {
    return undefined;
  }
  return {
    total,
    quantityPerPallet,
    palletQuantity: Math.floor(total / quantityPerPallet),
    leftOffQuantity: total % quantityPerPallet,
  };
}

type Result = {
  total: number;
  quantityPerPallet: number;
  palletQuantity: number;
  leftOffQuantity: number;
};

function App() {
  const [getTotal, setTotal] = createSignal<number>();
  const [getQuantityPerPallet, setQuantityPerPallet] = createSignal<number>();
  const [getTotalErrorMessage, setTotalErrorMessage] = createSignal<string>();
  const [getQuantityPerPalletErrorMessage, setQuantityPerPalletErrorMessage] =
    createSignal<string>();

  const [getResult, setResult] = createSignal<Result>();

  return (
    <Stack width="100%">
      <h1>計算</h1>
      <Stack spacing={2} alignItems="center" width="100%">
        <form
          style="width: 100%;"
          autocomplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            setResult(() => undefined);
            const result = calcResult(getTotal(), getQuantityPerPallet());
            console.log({
              result,
              total: getTotal(),
              quantityPerPallet: getQuantityPerPallet(),
            });
            setResult(() => result);
          }}
        >
          <Stack spacing={2} width="100%">
            <Stack spacing={1}>
              <Stack>
                <TextField
                  type="text"
                  label="全箱数"
                  value={getTotal()}
                  onChange={onChangeHandler(
                    setTotal,
                    positiveInt,
                    setTotalErrorMessage
                  )}
                />
                <Show when={getTotalErrorMessage()}>
                  <Typography color="red">{getTotalErrorMessage()}</Typography>
                </Show>
              </Stack>

              <Stack>
                <TextField
                  type="text"
                  label="1パレットあたりの箱数"
                  value={getQuantityPerPallet()}
                  onChange={onChangeHandler(
                    setQuantityPerPallet,
                    positiveInt,
                    setQuantityPerPalletErrorMessage
                  )}
                />
                <Show when={getQuantityPerPalletErrorMessage()}>
                  <Typography color="red">
                    {getQuantityPerPalletErrorMessage()}
                  </Typography>
                </Show>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Button type="submit" variant="contained">
                計算！
              </Button>
            </Stack>
          </Stack>
        </form>

        <ArrowCircleDownIcon />

        <Show when={getResult() !== undefined}>
          <Stack>
            <Typography color="silver">
              <ResultItem
                label="全箱数"
                value={getResult()?.total ?? 0}
                unit="個"
              />
            </Typography>
            <Typography color="silver">
              <ResultItem
                label="1パレットあたりの箱数"
                value={getResult()?.quantityPerPallet ?? 0}
                unit="個"
              />
            </Typography>
            <Typography fontWeight="bold">
              <ResultItem
                label="パレット数"
                value={getResult()?.palletQuantity ?? 0}
                unit="P/L"
              />
            </Typography>
            <Typography fontWeight="bold">
              <ResultItem
                label="余り"
                value={getResult()?.leftOffQuantity ?? 0}
                unit="C/S"
              />
            </Typography>
          </Stack>
        </Show>
      </Stack>
    </Stack>
  );
}

export default App;
