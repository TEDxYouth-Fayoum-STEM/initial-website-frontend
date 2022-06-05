import Swal from "sweetalert2";

export const FireEvent = {
  defaultError(): void {
    Swal.fire({
      title: "Something Went Wrong!",
      icon: "error",
    });
  },

  error(title: string, problem: string, msg: string): void {
    Swal.fire({
      title,
      html: `<div class="font-bold mb-1">${problem}</div><p>${msg}</p>`,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-error)",
    });
  },

  errors(errors: string[]): void {
    Swal.fire({
      title: "Something Went Wrong!",
      icon: "error",
      html: errors.map((e) => `<p>${e}</p>`),
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-error)",
    });
  },

  success(title: string, msg: string): void {
    Swal.fire({
      title,
      html: msg,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-primary-200)",
    });
  },

  loading(title: string): void {
    Swal.fire({
      title,
      allowOutsideClick: false,
    });
    Swal.showLoading();
  },

  close(): void {
    Swal.close();
  },

  alert: Swal.fire,
};
