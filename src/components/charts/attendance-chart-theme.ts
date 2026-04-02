import type { AttendanceBarTone } from "@/data/attendance-series"

export const ATTENDANCE_CHART_PRIMARY = "#003c60"
export const ATTENDANCE_CHART_PRIMARY_CONTAINER = "#005483"
export const ATTENDANCE_CHART_ON_SURFACE_VARIANT = "#41474f"

export function attendanceBarFill(tone: AttendanceBarTone, hovered: boolean): string {
  switch (tone) {
    case "peak":
      return ATTENDANCE_CHART_PRIMARY_CONTAINER
    case "mid":
      return hovered ? ATTENDANCE_CHART_PRIMARY_CONTAINER : "rgba(0, 84, 131, 0.6)"
    case "strong":
      return hovered ? ATTENDANCE_CHART_PRIMARY_CONTAINER : "rgba(0, 84, 131, 0.8)"
    case "soft":
      return hovered ? "rgba(0, 84, 131, 0.6)" : "rgba(0, 84, 131, 0.4)"
    default:
      return ATTENDANCE_CHART_PRIMARY_CONTAINER
  }
}
