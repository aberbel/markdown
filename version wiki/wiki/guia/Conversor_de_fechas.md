# Métodos ConversorDeFechas

## Métodos de Conversor De Fechas

| Método | Parámetros | Ejemplo 1 | Ejemplo 2 | Ejemplo 3 (Casos especiales) |
|--------|-----------|----------|----------|----------|
| **convertirFecha** | `String fecha, String formatoEntrada, String formatoSalida` | `convertirFecha("15/02/2025", "dd/MM/yyyy", "yyyy-MM-dd")` → `"2025-02-15"` | `convertirFecha("2025-02-10", "yyyy-MM-dd", "dd/MM/yyyy")` → `"10/02/2025"` | `convertirFecha("01/01/0001", "dd/MM/yyyy", "yyyy-MM-dd")` → `"0001-01-01"` |
| **convertirStringATimestamp** | `String fecha, String formatoEntrada` | `convertirStringATimestamp("15/02/2025 14:30:45", "dd/MM/yyyy HH:mm:ss")` → `Timestamp(2025-02-15 14:30:45)` | `convertirStringATimestamp("2025-02-10 09:15:00", "yyyy-MM-dd HH:mm:ss")` → `Timestamp(2025-02-10 09:15:00)` | `convertirStringATimestamp("0", "dd/MM/yyyy HH:mm:ss")` → `Timestamp(0001-01-01 00:00:00)` |
| **convertirStringADate** | `String fecha, String formatoEntrada` | `convertirStringADate("15/02/2025", "dd/MM/yyyy")` → `Date(2025-02-15)` | `convertirStringADate("2025-02-10", "yyyy-MM-dd")` → `Date(2025-02-10)` | `convertirStringADate("", "dd/MM/yyyy")` → `Date(0001-01-01)` |
| **convertirTimestampAString** | `Timestamp fecha, String formatoSalida` | `convertirTimestampAString(Timestamp.valueOf("2025-02-15 14:30:00"), "dd/MM/yyyy HH:mm:ss")` → `"15/02/2025 14:30:00"` | `convertirTimestampAString(Timestamp.valueOf("2025-02-10 09:15:00"), "yyyy-MM-dd")` → `"2025-02-10"` | `convertirTimestampAString(Timestamp.valueOf("0001-01-01 00:00:00"), "dd/MM/yyyy")` → `""` |
| **convertirDateAString** | `Date fecha, String formatoSalida` | `convertirDateAString(Date.valueOf("2025-02-15"), "dd/MM/yyyy")` → `"15/02/2025"` | `convertirDateAString(Date.valueOf("2025-02-10"), "yyyy-MM-dd")` → `"2025-02-10"` | `convertirDateAString(Date.valueOf("0001-01-01"), "dd/MM/yyyy")` → `""` |
| **convertirTimestampADate** | `Timestamp fecha` | `convertirTimestampADate(Timestamp.valueOf("2025-02-15 14:30:00"))` → `Date(2025-02-15)` | `convertirTimestampADate(Timestamp.valueOf("2025-02-10 09:15:00"))` → `Date(2025-02-10)` | `convertirTimestampADate(Timestamp.valueOf("0001-01-01 00:00:00"))` → `Date(0001-01-01)` |
| **convertirDateATimestamp** | `Date fecha` | `convertirDateATimestamp(Date.valueOf("2025-02-15"))` → `Timestamp(2025-02-15 00:00:00)` | `convertirDateATimestamp(Date.valueOf("2025-02-10"))` → `Timestamp(2025-02-10 00:00:00)` | `convertirDateATimestamp(Date.valueOf("0001-01-01"))` → `Timestamp(0001-01-01 00:00:00)` |
