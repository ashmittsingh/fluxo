import { Loader2Icon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EntityHeaderProps = {
    title: string;
    description?: string;
    newButtonLabel: string;
    newButtonHref?: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
    | { onNew: () => void; newButtonHref?: never }
    | { newButtonHref: string; onNew?: never }
    | { onNew?: never; newButtonHref?: never }
);

const newButtonClass =
    "h-9 gap-1.5 rounded-none border border-[#0B0B0C] bg-[#0B0B0C] px-4 text-white shadow-none transition-colors duration-200 hover:bg-white hover:text-[#0B0B0C] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#0B0B0C] disabled:hover:text-white";

export const EntityHeader = ({
    title,
    description,
    onNew,
    newButtonLabel,
    newButtonHref,
    disabled,
    isCreating,
}: EntityHeaderProps) => {
    return (
        <div className="flex flex-row items-end justify-between gap-x-4 border-b border-[#E2E2E0] pb-6">
            <div className="flex flex-col gap-1">
                <h1
                    className="text-lg font-medium text-[#0B0B0C] md:text-xl"
                    style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
                >
                    {title}
                </h1>
                {description && <p className="text-xs text-[#6E6E6E] md:text-sm">{description}</p>}
            </div>

            {onNew && !newButtonHref && (
                <Button disabled={isCreating || disabled} onClick={onNew} size="sm" className={newButtonClass}>
                    {isCreating ? (
                        <Loader2Icon className="size-4 animate-spin" strokeWidth={1.75} />
                    ) : (
                        <PlusIcon className="size-4" strokeWidth={1.75} />
                    )}
                    {newButtonLabel}
                </Button>
            )}

            {newButtonHref && !onNew && (
                <Button
                    size="sm"
                    disabled={disabled}
                    className={newButtonClass}
                    render={
                        <Link href={newButtonHref} prefetch>
                            <PlusIcon className="size-4" strokeWidth={1.75} />
                            {newButtonLabel}
                        </Link>
                    }
                />
            )}
        </div>
    );
};

type EntityContainerProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
    search?: React.ReactNode;
    pagination?: React.ReactNode;
};

export const EntityContainer = ({ children, header, search, pagination }: EntityContainerProps) => {
    return (
        <div className="h-full bg-white p-4 md:px-10 md:py-6">
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-y-8">
                {header}
                <div className="flex h-full flex-col gap-y-4">
                    {search}
                    {children}
                </div>
                {pagination && <div className="border-t border-[#E2E2E0] pt-4">{pagination}</div>}
            </div>
        </div>
    );
};


interface EntitySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}


export const EntitySearch =({
    value,
    onChange,
    placeholder
}: EntitySearchProps) => {
    return (
        <div>
            <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
                className="max-w-50 bg-background shadow-none border-border pl-8 " 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

interface EntityPaginationProps {
    page: number,
    totalPages: number,
    onPageChange: (page: number) => void,
    disabled?:boolean
};


export const EntityPagination = ({
    page,
    totalPages,
    onPageChange,
    disabled
}: EntityPaginationProps) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2  py-4">
                <Button 
                disabled={page === 1 || disabled}
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                >
                    Previous
                </Button>
                <Button
                disabled={page === totalPages || totalPages === 0 || disabled}
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                >
                    Next
                </Button>
            </div>    
        </div>
    )
}
