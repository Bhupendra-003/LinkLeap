import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => { 
  return (
    (<Sonner
      className="bg-white text-black"
      toastOptions={{
        classNames: {
          toast:
            "",
          actionButton:
            "",
          cancelButton:
            "",
        },
      }}
      {...props} />)
  );
}

export { Toaster }
