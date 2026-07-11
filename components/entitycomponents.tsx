import { Loader2Icon, PlusIcon, SearchIcon, AlertTriangleIcon, PackageOpenIcon, MoreVerticalIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";


import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



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
 
export const EntitySearch = ({ value, onChange, placeholder }: EntitySearchProps) => {
    return (

        <div className="relative w-full sm:w-56">
            <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#6E6E6E]"
                strokeWidth={1.5}
            />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-9 rounded-none border-[#E2E2E0] bg-white pl-8 pr-8 text-[0.85rem] text-[#0B0B0C] shadow-none placeholder:text-[#B9B9B6] focus-visible:border-[#0B0B0C] focus-visible:ring-0"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E6E6E] transition-colors hover:text-[#0B0B0C]"
                >
                    <XIcon className="size-3.5" strokeWidth={1.5} />
                </button>
            )}
        </div>
    );
};

interface EntityPaginationProps {
    page: number,
    totalPages: number,
    onPageChange: (page: number) => void,
    disabled?: boolean
};

const navButtonClass =
    "gap-1.5 rounded-none border-[#E2E2E0] text-[#0B0B0C] shadow-none transition-colors duration-200 hover:border-[#0B0B0C] hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E2E2E0] disabled:hover:bg-transparent";

export const EntityPagination = ({ page, totalPages, onPageChange, disabled }: EntityPaginationProps) => {
    return (
        <div className="flex w-full items-center justify-between gap-x-2 py-4">
            <p className="flex-1 font-mono text-[11px] tracking-[0.15em] text-[#6E6E6E] uppercase">
                Page {page} of {totalPages || 1}
            </p>
            <div className="flex items-center justify-end gap-x-2">
                <Button
                    disabled={page === 1 || disabled}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    className={navButtonClass}
                >
                    <ChevronLeftIcon className="size-4" strokeWidth={1.5} />
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0 || disabled}
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className={navButtonClass}
                >
                    Next
                    <ChevronRightIcon className="size-4" strokeWidth={1.5} />
                </Button>
            </div>
        </div>
    );
};

interface StateViewProps {
    message?: string;
}
 
export const LoadingView = ({ message }: StateViewProps) => {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex flex-col items-center gap-y-4"
            >
                <Loader2Icon className="size-6 animate-spin text-[#0B0B0C]" strokeWidth={1.5} />
                {!!message && <p className="text-sm text-[#6E6E6E]">{message}</p>}
            </motion.div>
        </div>
    );
};



export const ErrorView = ({ message }: StateViewProps) => {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
            {/* No delay here — unlike LoadingView, this is a settled state the
                user should register immediately, not something to visually debounce. */}
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-y-4"
            >
                {/* Kept monochrome rather than the usual red/destructive treatment —
                    even error states stay ink/graphite, per the black & white system. */}
                <AlertTriangleIcon className="size-6 text-[#0B0B0C]" strokeWidth={1.5} />
                {!!message && <p className="text-sm text-[#6E6E6E]">{message}</p>}
            </motion.div>
        </div>
    );
};

interface EmptyViewProps extends StateViewProps {
    onNew?: () => void;
}
 
export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Dashed hairline in the same #E2E2E0 used for every other border in the
                app, rather than the default dashed-gray — keeps it from reading as a
                different, unrelated shade of gray next to solid-bordered cards nearby. */}
            <Empty className="rounded-none border border-dashed border-[#E2E2E0] bg-white">
                <EmptyHeader>
                    <EmptyMedia className="rounded-none border border-[#E2E2E0] bg-white text-[#0B0B0C]">
                        <PackageOpenIcon className="h-4 w-4" strokeWidth={1.5} />
                    </EmptyMedia>
                </EmptyHeader>
                <EmptyTitle
                    className="font-medium text-[#0B0B0C]"
                    style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
                >
                    No items found
                </EmptyTitle>
                {!!message && <EmptyDescription className="text-[#6E6E6E]">{message}</EmptyDescription>}
                {!!onNew && (
                    <EmptyContent>
                        <Button
                            onClick={onNew}
                            className="rounded-none border border-[#0B0B0C] bg-[#0B0B0C] text-white shadow-none transition-colors duration-200 hover:bg-white hover:text-[#0B0B0C]"
                        >
                            Create item
                        </Button>
                    </EmptyContent>
                )}
            </Empty>
        </motion.div>
    );
};


interface EntityListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    getKey?: (item: T, index: number) => string | number;
    emptyView?: React.ReactNode;
    className?: string;
};


export function EntityList<T>({ items, renderItem, getKey, emptyView, className }: EntityListProps<T>) {
    if (items.length === 0 && emptyView) {
        return (
            <>
                <div className="flex-1 flex justify-center items-center">
                    <div className="max-w-sm mx-auto">
                        {emptyView}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={cn("flex flex-col gap-y-4",className)}>
            {
                items.map((item, index) => (
                    <div key={getKey ? getKey(item, index) : index}>
                        {renderItem(item, index)}
                    </div>
                ))    
            }
        </div>
    );
};


interface EntityItemProps {
    href: string;
    title: string;
    subtitle?: string;
    image?: React.ReactNode;
    actions?: React.ReactNode;
    onRemove?: () => void | Promise<void>;
    isRemoving?: boolean;
    className?: string;
};

export const EntityItem = ({
    href,
    title,
    subtitle,
    image,
    actions,
    onRemove,
    isRemoving,
    className,
}: EntityItemProps) => {
    const handleRemove = async () => {
        if (isRemoving || !onRemove) return;
        await onRemove();
    };
 
    return (
        <Card
            className={cn(
                "relative rounded-none border-[#E2E2E0] p-4 shadow-none transition-colors duration-200 hover:border-[#0B0B0C]",
                isRemoving && "pointer-events-none opacity-50",
                className
            )}
        >
            <CardContent className="relative z-0 flex flex-row items-center justify-between p-0">
                <div className="flex items-center gap-3">
                    {image}
                    <div>
                        <CardTitle className="text-base font-medium text-[#0B0B0C]">{title}</CardTitle>
                        {!!subtitle && <CardDescription className="text-xs text-[#6E6E6E]">{subtitle}</CardDescription>}
                    </div>
                </div>
 
                {(actions || onRemove) && (
                    <div className="relative z-20 flex items-center gap-x-4">
                        {actions}
                        {onRemove && (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            disabled={isRemoving}
                                            className="rounded-none text-[#6E6E6E] hover:bg-black/4 hover:text-[#0B0B0C]"
                                        >
                                            <MoreVerticalIcon className="size-4" strokeWidth={1.5} />
                                        </Button>
                                    }
                                />
                                <DropdownMenuContent
                                    align="end"
                                    className="rounded-none border-[#E2E2E0] shadow-none"
                                >
                                    <DropdownMenuItem
                                        onClick={handleRemove}
                                        className="gap-2 rounded-none text-[#0B0B0C] focus:bg-black/4 focus:text-[#0B0B0C]"
                                    >
                                        <TrashIcon className="size-4" strokeWidth={1.5} />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                )}
            </CardContent>
 
            <Link
                href={href}
                prefetch
                aria-label={title}
                tabIndex={isRemoving ? -1 : 0}
                className="absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0B0B0C] focus-visible:ring-offset-2"
            />
        </Card>
    );
};