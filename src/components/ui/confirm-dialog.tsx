import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { AlertTriangle, Trash2, LogOut, AlertCircle, LucideIcon } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: "default" | "danger" | "warning";
  icon?: LucideIcon;
  loading?: boolean;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  icon,
  loading = false,
}: ConfirmDialogProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const variantConfig = {
    default: {
      icon: icon || AlertCircle,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      confirmVariant: "default" as const,
    },
    danger: {
      icon: icon || Trash2,
      iconBg: "bg-destructive/10",
      iconColor: "text-destructive",
      confirmVariant: "destructive" as const,
    },
    warning: {
      icon: icon || AlertTriangle,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-600",
      confirmVariant: "default" as const,
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full mb-4",
              config.iconBg
            )}
          >
            <Icon className={cn("h-6 w-6", config.iconColor)} />
          </div>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel} disabled={loading || isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            loading={loading || isLoading}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Convenience hooks for common confirm dialogs
export const useConfirmDialog = () => {
  const [state, setState] = React.useState<{
    open: boolean;
    props: Omit<ConfirmDialogProps, "open" | "onOpenChange">;
  }>({
    open: false,
    props: {
      title: "",
      onConfirm: () => {},
    },
  });

  const confirm = (props: Omit<ConfirmDialogProps, "open" | "onOpenChange">) => {
    setState({ open: true, props });
  };

  const close = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      {...state.props}
      open={state.open}
      onOpenChange={(open) => setState((prev) => ({ ...prev, open }))}
    />
  );

  return { confirm, close, ConfirmDialogComponent };
};

// Pre-built confirm dialogs
export const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  itemName,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName?: string;
  onConfirm: () => void | Promise<void>;
}) => (
  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    title={`Delete ${itemName || "item"}?`}
    description={`This action cannot be undone. This will permanently delete ${
      itemName ? `"${itemName}"` : "this item"
    }.`}
    confirmLabel="Delete"
    variant="danger"
    onConfirm={onConfirm}
  />
);

export const LogoutConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
}) => (
  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Sign out?"
    description="Are you sure you want to sign out of your account?"
    confirmLabel="Sign out"
    icon={LogOut}
    variant="warning"
    onConfirm={onConfirm}
  />
);

export default ConfirmDialog;
