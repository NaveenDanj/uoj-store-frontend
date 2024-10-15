export type Folder = {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: null | Date;
    user_id: number;
    name: string;
    parent_id: number;
    special_folder: string;
}


export type File = {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: Date | null;
    file_id: number;
    folder_id: number;
    user_id: number;
    original_name: string;
    file_size: number;
    mime_type: string;
    upload_date: Date;
    storage_path: string;
    file_signature: string;
    download_count: number;
    last_accessed: Date;
    is_favourite: boolean;
    is_deleted: boolean;
    is_public: boolean;
}