import Swal from "sweetalert2";

export const FireEvent = {
  error(title: string, problem: string, msg: string): void {
    Swal.fire({
      title,
      html: `<div class="font-bold mb-1">${problem}</div><p>${msg}</p>`,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-error)",
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
};
