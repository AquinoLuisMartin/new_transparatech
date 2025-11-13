-- ======================================================
-- TRANSPARATECH DATABASE SCHEMA FOR POSTGRESQL
-- Database: db_transparatech
-- Created: November 4, 2025
-- Version: 1.0
-- ======================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ======================================================
-- 1. ROLES AND PERMISSIONS SYSTEM
-- ======================================================

-- Roles table with hierarchy support
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    hierarchy_level INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permissions table
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(150) NOT NULL,
    description TEXT,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    is_system_permission BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role-Permission mapping
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    granted_by UUID,
    UNIQUE(role_id, permission_id)
);

-- ======================================================
-- 2. ORGANIZATIONS MANAGEMENT
-- ======================================================

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending_approval')),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    president_name VARCHAR(255),
    adviser_name VARCHAR(255),
    adviser_email VARCHAR(255),
    established_date DATE,
    website_url TEXT,
    logo_url TEXT,
    address TEXT,
    member_count INTEGER DEFAULT 0 CHECK (member_count >= 0),
    officer_count INTEGER DEFAULT 0 CHECK (officer_count >= 0),
    submission_count INTEGER DEFAULT 0 CHECK (submission_count >= 0),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 3. USERS MANAGEMENT
-- ======================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    student_number VARCHAR(50) UNIQUE,
    employee_id VARCHAR(50) UNIQUE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'suspended', 'pending', 'locked')),
    is_email_verified BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    bio TEXT,
    position VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    address TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP WITH TIME ZONE,
    email_verification_token VARCHAR(255),
    email_verification_expires TIMESTAMP WITH TIME ZONE,
    two_factor_secret VARCHAR(255),
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    backup_codes TEXT[],
    submission_count INTEGER DEFAULT 0 CHECK (submission_count >= 0),
    approval_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (approval_rate >= 0 AND approval_rate <= 100),
    preferred_language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 4. DOCUMENT CATEGORIES
-- ======================================================

CREATE TABLE document_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    parent_category_id UUID REFERENCES document_categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    requires_approval BOOLEAN DEFAULT TRUE,
    max_file_size BIGINT DEFAULT 52428800, -- 50MB default
    allowed_file_types TEXT[] DEFAULT '{"pdf","doc","docx","xls","xlsx","jpg","jpeg","png"}',
    retention_period_days INTEGER DEFAULT 2555, -- 7 years default
    sort_order INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 5. SUBMISSIONS SYSTEM
-- ======================================================

-- Submission number sequence
CREATE SEQUENCE submission_number_seq START 1000;

CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES document_categories(id) ON DELETE SET NULL,
    submitter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'pending', 'under_review', 'revision_required', 'approved', 'rejected', 'withdrawn', 'archived')),
    priority VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    current_step INTEGER DEFAULT 1,
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    revision_notes TEXT,
    estimated_review_time VARCHAR(50),
    actual_review_time INTERVAL,
    is_public BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    version INTEGER DEFAULT 1,
    parent_submission_id UUID REFERENCES submissions(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    tags TEXT[],
    due_date TIMESTAMP WITH TIME ZONE,
    reminder_sent_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    search_vector tsvector,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submission Files
CREATE TABLE submission_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    original_filename VARCHAR(500) NOT NULL,
    stored_filename VARCHAR(500) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL CHECK (file_size > 0),
    mime_type VARCHAR(100) NOT NULL,
    file_extension VARCHAR(10),
    file_hash VARCHAR(64),
    virus_scan_status VARCHAR(20) DEFAULT 'pending' CHECK (virus_scan_status IN ('pending', 'clean', 'infected', 'error')),
    virus_scan_date TIMESTAMP WITH TIME ZONE,
    is_primary BOOLEAN DEFAULT FALSE,
    is_confidential BOOLEAN DEFAULT FALSE,
    upload_order INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submission Comments/Reviews
CREATE TABLE submission_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    commenter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    comment_type VARCHAR(30) DEFAULT 'review' CHECK (comment_type IN ('review', 'revision_request', 'approval', 'rejection', 'internal', 'public', 'clarification')),
    is_internal BOOLEAN DEFAULT FALSE,
    is_system_generated BOOLEAN DEFAULT FALSE,
    parent_comment_id UUID REFERENCES submission_comments(id) ON DELETE CASCADE,
    attachments TEXT[],
    mentioned_users UUID[],
    resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 6. ACTIVITY LOGGING
-- ======================================================

CREATE TABLE activity_logs (
    id UUID DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    action_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    description TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    location VARCHAR(100),
    device_info JSONB DEFAULT '{}',
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- ======================================================
-- 7. ANNOUNCEMENTS SYSTEM
-- ======================================================

CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    category VARCHAR(50) DEFAULT 'general',
    target_audience VARCHAR(30) NOT NULL DEFAULT 'all' CHECK (target_audience IN ('all', 'officers', 'viewers', 'specific_org', 'specific_role')),
    target_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    priority VARCHAR(10) NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_published BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_emergency BOOLEAN DEFAULT FALSE,
    publish_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    featured_image_url TEXT,
    attachment_urls TEXT[],
    tags TEXT[],
    search_vector tsvector,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 8. NOTIFICATIONS SYSTEM
-- ======================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(30) NOT NULL,
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    action_url TEXT,
    resource_type VARCHAR(50),
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 9. SYSTEM SETTINGS
-- ======================================================

CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type VARCHAR(20) NOT NULL DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'encrypted')),
    category VARCHAR(50) DEFAULT 'general',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_system BOOLEAN DEFAULT FALSE,
    validation_rules JSONB DEFAULT '{}',
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 10. ANALYTICS AND TRACKING
-- ======================================================

CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    resource_type VARCHAR(50),
    resource_id UUID,
    properties JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_url TEXT,
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(50),
    city VARCHAR(100),
    duration INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 11. FEEDBACK SYSTEM
-- ======================================================

CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    feedback_type VARCHAR(30) NOT NULL DEFAULT 'general' CHECK (feedback_type IN ('bug_report', 'feature_request', 'general', 'complaint', 'suggestion', 'security_issue')),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed', 'duplicate')),
    priority VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    category VARCHAR(50),
    browser_info TEXT,
    page_url TEXT,
    screenshots TEXT[],
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- 12. USER SESSIONS AND SECURITY
-- ======================================================

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    device_info JSONB DEFAULT '{}',
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================================
-- INDEXES FOR PERFORMANCE
-- ======================================================

-- Roles and permissions indexes
CREATE INDEX idx_roles_name ON roles(name);
CREATE INDEX idx_roles_active ON roles(is_active);
CREATE INDEX idx_permissions_resource_action ON permissions(resource, action);
CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);

-- Organizations indexes
CREATE INDEX idx_organizations_acronym ON organizations(acronym);
CREATE INDEX idx_organizations_status ON organizations(status);

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_student_number ON users(student_number);

-- Submissions indexes
CREATE INDEX idx_submissions_number ON submissions(submission_number);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_submitter_id ON submissions(submitter_id);
CREATE INDEX idx_submissions_organization_id ON submissions(organization_id);
CREATE INDEX idx_submissions_category_id ON submissions(category_id);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);
CREATE INDEX idx_submissions_search_vector ON submissions USING gin(search_vector);

-- Files indexes
CREATE INDEX idx_submission_files_submission_id ON submission_files(submission_id);
CREATE INDEX idx_submission_files_hash ON submission_files(file_hash);

-- Activity logs indexes (for partitioned table)
CREATE INDEX idx_activity_logs_user_id ON activity_logs (user_id, created_at);
CREATE INDEX idx_activity_logs_action_type ON activity_logs (action_type, created_at);
CREATE INDEX idx_activity_logs_created_at ON activity_logs (created_at);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);

-- Announcements indexes
CREATE INDEX idx_announcements_published ON announcements(is_published);
CREATE INDEX idx_announcements_target_audience ON announcements(target_audience);
CREATE INDEX idx_announcements_search_vector ON announcements USING gin(search_vector);

-- Analytics indexes
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- ======================================================
-- FUNCTIONS AND STORED PROCEDURES
-- ======================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Password security validation function
CREATE OR REPLACE FUNCTION validate_password_strength(password_text TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check minimum length (8 characters)
    IF LENGTH(password_text) < 8 THEN
        RETURN FALSE;
    END IF;
    
    -- Check for at least one uppercase letter
    IF password_text !~ '[A-Z]' THEN
        RETURN FALSE;
    END IF;
    
    -- Check for at least one lowercase letter
    IF password_text !~ '[a-z]' THEN
        RETURN FALSE;
    END IF;
    
    -- Check for at least one digit
    IF password_text !~ '[0-9]' THEN
        RETURN FALSE;
    END IF;
    
    -- Check for at least one special character
    IF password_text !~ '[^A-Za-z0-9]' THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to hash passwords (for database-level operations)
-- Note: This is a fallback. Primary hashing should be done in application layer
CREATE OR REPLACE FUNCTION hash_password_db(password_text TEXT)
RETURNS TEXT AS $$
BEGIN
    -- Use PostgreSQL's crypt function with bcrypt
    -- This requires the pgcrypto extension
    RETURN crypt(password_text, gen_salt('bf', 12));
END;
$$ LANGUAGE plpgsql;

-- Function to verify password against hash
CREATE OR REPLACE FUNCTION verify_password_db(password_text TEXT, password_hash TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN password_hash = crypt(password_text, password_hash);
END;
$$ LANGUAGE plpgsql;

-- Secure user creation function with automatic password hashing
CREATE OR REPLACE FUNCTION create_user_secure(
    p_email VARCHAR(255),
    p_password VARCHAR(255),
    p_first_name VARCHAR(100),
    p_last_name VARCHAR(100),
    p_middle_name VARCHAR(100) DEFAULT NULL,
    p_student_number VARCHAR(50) DEFAULT NULL,
    p_employee_id VARCHAR(50) DEFAULT NULL,
    p_role_name VARCHAR(50) DEFAULT 'viewer',
    p_organization_acronym VARCHAR(20) DEFAULT NULL
)
RETURNS TABLE(
    user_id UUID,
    user_email VARCHAR(255),
    user_role VARCHAR(50),
    user_organization VARCHAR(255),
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_role_id UUID;
    v_organization_id UUID;
    v_hashed_password TEXT;
    v_user_id UUID;
BEGIN
    -- Validate password strength
    IF NOT validate_password_strength(p_password) THEN
        RETURN QUERY SELECT NULL::UUID, NULL::VARCHAR(255), NULL::VARCHAR(50), NULL::VARCHAR(255), FALSE, 'Password does not meet security requirements'::TEXT;
        RETURN;
    END IF;
    
    -- Check if email already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
        RETURN QUERY SELECT NULL::UUID, NULL::VARCHAR(255), NULL::VARCHAR(50), NULL::VARCHAR(255), FALSE, 'Email already exists'::TEXT;
        RETURN;
    END IF;
    
    -- Get role ID
    SELECT id INTO v_role_id FROM roles WHERE name = p_role_name AND is_active = TRUE;
    IF v_role_id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, NULL::VARCHAR(255), NULL::VARCHAR(50), NULL::VARCHAR(255), FALSE, 'Invalid role specified'::TEXT;
        RETURN;
    END IF;
    
    -- Get organization ID if specified
    IF p_organization_acronym IS NOT NULL THEN
        SELECT id INTO v_organization_id FROM organizations WHERE acronym = p_organization_acronym AND status = 'active';
        IF v_organization_id IS NULL THEN
            RETURN QUERY SELECT NULL::UUID, NULL::VARCHAR(255), NULL::VARCHAR(50), NULL::VARCHAR(255), FALSE, 'Invalid organization specified'::TEXT;
            RETURN;
        END IF;
    END IF;
    
    -- Hash password (backup method - prefer application-level hashing)
    v_hashed_password := hash_password_db(p_password);
    
    -- Insert user
    INSERT INTO users (
        email, password, first_name, last_name, middle_name,
        student_number, employee_id, role_id, organization_id,
        status, is_email_verified
    ) VALUES (
        p_email, v_hashed_password, p_first_name, p_last_name, p_middle_name,
        p_student_number, p_employee_id, v_role_id, v_organization_id,
        'pending', FALSE
    ) RETURNING id INTO v_user_id;
    
    -- Log the user creation
    INSERT INTO activity_logs (
        user_id, action_type, resource_type, resource_id, description
    ) VALUES (
        v_user_id, 'user_registration', 'user', v_user_id, 'New user account created'
    );
    
    -- Return success
    RETURN QUERY SELECT 
        v_user_id,
        p_email,
        p_role_name,
        COALESCE((SELECT name FROM organizations WHERE id = v_organization_id), 'No Organization'),
        TRUE,
        'User created successfully'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Submission number generation function
CREATE OR REPLACE FUNCTION generate_submission_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.submission_number IS NULL THEN
        NEW.submission_number := 'SUB-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('submission_number_seq')::text, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- User permission check function
CREATE OR REPLACE FUNCTION user_has_permission(
    user_uuid UUID,
    permission_name VARCHAR(100)
)
RETURNS BOOLEAN AS $$
DECLARE
    has_perm BOOLEAN := FALSE;
BEGIN
    SELECT EXISTS(
        SELECT 1 
        FROM users u
        JOIN role_permissions rp ON u.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = user_uuid 
        AND p.name = permission_name
        AND u.status = 'active'
    ) INTO has_perm;
    
    RETURN has_perm;
END;
$$ LANGUAGE plpgsql;

-- Role assignment function
CREATE OR REPLACE FUNCTION assign_role_to_user(
    user_uuid UUID,
    role_name VARCHAR(50),
    assigned_by UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    role_uuid UUID;
    success BOOLEAN := FALSE;
BEGIN
    SELECT id FROM roles WHERE name = role_name AND is_active = TRUE INTO role_uuid;
    
    IF role_uuid IS NOT NULL THEN
        UPDATE users SET role_id = role_uuid, updated_at = NOW() WHERE id = user_uuid;
        
        INSERT INTO activity_logs (user_id, action_type, resource_type, resource_id, description, metadata)
        VALUES (assigned_by, 'role_assignment', 'user', user_uuid, 
                'Role ' || role_name || ' assigned to user', 
                jsonb_build_object('new_role', role_name));
        
        success := TRUE;
    END IF;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;

-- Update organization stats function
CREATE OR REPLACE FUNCTION update_organization_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Update submission count
        UPDATE organizations 
        SET submission_count = (
            SELECT COUNT(*) FROM submissions WHERE organization_id = NEW.organization_id
        ),
        last_activity = NOW()
        WHERE id = NEW.organization_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Update submission count
        UPDATE organizations 
        SET submission_count = (
            SELECT COUNT(*) FROM submissions WHERE organization_id = OLD.organization_id
        )
        WHERE id = OLD.organization_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Update user stats function
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Update submission count and approval rate
        UPDATE users 
        SET submission_count = (
            SELECT COUNT(*) FROM submissions WHERE submitter_id = NEW.submitter_id
        ),
        approval_rate = (
            SELECT 
                CASE 
                    WHEN COUNT(*) = 0 THEN 0 
                    ELSE ROUND((COUNT(*) FILTER (WHERE status = 'approved')::DECIMAL / COUNT(*)) * 100, 2)
                END
            FROM submissions 
            WHERE submitter_id = NEW.submitter_id AND status IN ('approved', 'rejected')
        )
        WHERE id = NEW.submitter_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Update submission count and approval rate
        UPDATE users 
        SET submission_count = (
            SELECT COUNT(*) FROM submissions WHERE submitter_id = OLD.submitter_id
        ),
        approval_rate = (
            SELECT 
                CASE 
                    WHEN COUNT(*) = 0 THEN 0 
                    ELSE ROUND((COUNT(*) FILTER (WHERE status = 'approved')::DECIMAL / COUNT(*)) * 100, 2)
                END
            FROM submissions 
            WHERE submitter_id = OLD.submitter_id AND status IN ('approved', 'rejected')
        )
        WHERE id = OLD.submitter_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- TRIGGERS
-- ======================================================

-- Updated_at triggers
CREATE TRIGGER update_roles_updated_at 
    BEFORE UPDATE ON roles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at 
    BEFORE UPDATE ON organizations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at 
    BEFORE UPDATE ON submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at 
    BEFORE UPDATE ON announcements 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON feedback 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Submission number generation trigger
CREATE TRIGGER trigger_generate_submission_number 
    BEFORE INSERT ON submissions 
    FOR EACH ROW EXECUTE FUNCTION generate_submission_number();

-- Stats update triggers
CREATE TRIGGER trigger_update_organization_stats 
    AFTER INSERT OR UPDATE OR DELETE ON submissions 
    FOR EACH ROW EXECUTE FUNCTION update_organization_stats();

CREATE TRIGGER trigger_update_user_stats 
    AFTER INSERT OR UPDATE OR DELETE ON submissions 
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- Password security triggers
CREATE OR REPLACE FUNCTION validate_user_password()
RETURNS TRIGGER AS $$
BEGIN
    -- Only validate if password is being set/changed and it's not already hashed
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.password != OLD.password) THEN
        -- Check if password is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
        IF NEW.password !~ '^\$2[aby]\$' THEN
            -- Validate password strength only if it's plain text
            IF NOT validate_password_strength(NEW.password) THEN
                RAISE EXCEPTION 'Password does not meet security requirements: minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character';
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_user_password
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION validate_user_password();

-- Audit trigger for password changes
CREATE OR REPLACE FUNCTION audit_password_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND NEW.password != OLD.password THEN
        INSERT INTO activity_logs (
            user_id, action_type, resource_type, resource_id, 
            description, ip_address, metadata
        ) VALUES (
            NEW.id, 'password_change', 'user', NEW.id,
            'User password was changed', 
            COALESCE(current_setting('app.client_ip', true), '0.0.0.0')::inet,
            jsonb_build_object(
                'timestamp', NOW(),
                'changed_by', COALESCE(current_setting('app.current_user_id', true), 'system')
            )
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_audit_password_change
    AFTER UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_password_change();

-- ======================================================
-- INITIAL DATA SEEDING
-- ======================================================

-- Insert default roles
INSERT INTO roles (name, display_name, description, is_system_role, hierarchy_level) VALUES
('admin_full', 'Full Administrator', 'Complete system access and control', true, 100),
('admin_approval', 'Approval Administrator', 'Document approval and reporting access', true, 75),
('officer', 'Officer', 'Student organization officers', true, 50),
('viewer', 'Viewer', 'General users and students', true, 25);

-- Insert default permissions
INSERT INTO permissions (name, display_name, description, resource, action, is_system_permission) VALUES
-- Transparency permissions
('view_transparency', 'View Transparency Data', 'Access to public transparency information', 'transparency', 'read', true),

-- File permissions
('upload_files', 'Upload Files', 'Upload documents and files', 'files', 'create', true),
('approve_files', 'Approve Files', 'Approve submitted files', 'files', 'approve', true),
('download_files', 'Download Files', 'Download approved files', 'files', 'read', true),

-- Content management
('manage_content', 'Manage Content', 'Create and edit content', 'content', 'manage', true),

-- Submission permissions
('review_submissions', 'Review Submissions', 'Review and process submissions', 'submissions', 'review', true),
('create_submissions', 'Create Submissions', 'Create new submissions', 'submissions', 'create', true),
('edit_submissions', 'Edit Submissions', 'Edit own submissions', 'submissions', 'update', true),
('delete_submissions', 'Delete Submissions', 'Delete submissions', 'submissions', 'delete', true),

-- Monitoring
('monitor_activities', 'Monitor Activities', 'View system activities and logs', 'activities', 'read', true),

-- User management
('manage_users', 'Manage Users', 'Full user management access', 'users', 'manage', true),
('create_users', 'Create Users', 'Create new user accounts', 'users', 'create', true),
('edit_users', 'Edit Users', 'Edit user information', 'users', 'update', true),
('delete_users', 'Delete Users', 'Delete user accounts', 'users', 'delete', true),

-- Organization management
('manage_organizations', 'Manage Organizations', 'Manage organizations', 'organizations', 'manage', true),
('create_organizations', 'Create Organizations', 'Create new organizations', 'organizations', 'create', true),
('edit_organizations', 'Edit Organizations', 'Edit organization information', 'organizations', 'update', true),

-- System settings
('manage_system_settings', 'Manage System Settings', 'Configure system settings', 'system', 'manage', true),
('view_analytics', 'View Analytics', 'Access analytics and reports', 'analytics', 'read', true),
('export_reports', 'Export Reports', 'Export system reports', 'reports', 'export', true),

-- Announcements
('create_announcements', 'Create Announcements', 'Create new announcements', 'announcements', 'create', true),
('manage_announcements', 'Manage Announcements', 'Full announcement management', 'announcements', 'manage', true),
('view_announcements', 'View Announcements', 'View announcements', 'announcements', 'read', true),

-- Comments and feedback
('moderate_comments', 'Moderate Comments', 'Moderate user comments', 'comments', 'moderate', true),
('view_feedback', 'View Feedback', 'View user feedback', 'feedback', 'read', true),
('respond_feedback', 'Respond to Feedback', 'Respond to user feedback', 'feedback', 'respond', true);

-- Assign permissions to roles
-- Admin Full permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'admin_full';

-- Admin Approval permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'admin_approval' 
AND p.name IN ('view_transparency', 'approve_files', 'download_files', 'manage_content', 
               'review_submissions', 'monitor_activities', 'view_analytics', 'export_reports',
               'view_announcements', 'moderate_comments', 'view_feedback', 'respond_feedback');

-- Officer permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'officer' 
AND p.name IN ('view_transparency', 'upload_files', 'download_files', 'manage_content',
               'create_submissions', 'edit_submissions', 'view_announcements', 'create_announcements');

-- Viewer permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p 
WHERE r.name = 'viewer' 
AND p.name IN ('view_transparency', 'view_announcements');

-- Insert default document categories
INSERT INTO document_categories (name, description, icon, color, requires_approval) VALUES
('Financial Report', 'Monthly and quarterly financial reports', 'money', '#10B981', true),
('Purchase Receipt', 'Equipment and supplies purchase receipts', 'receipt', '#3B82F6', true),
('Event Expense', 'Event-related expenses and documentation', 'calendar', '#F59E0B', true),
('Training Expense', 'Training and workshop related expenses', 'academic-cap', '#8B5CF6', true),
('Office Supplies', 'Office supplies and stationery purchases', 'office', '#6B7280', true),
('Performance Report', 'Organizational performance reports', 'chart-bar', '#EF4444', true),
('Administrative', 'Administrative documents and policies', 'document-text', '#06B6D4', true),
('Audit', 'Audit reports and compliance documents', 'shield-check', '#DC2626', true);

-- Insert default organizations (matching client-side form)
INSERT INTO organizations (name, acronym, description, status, contact_email) VALUES
-- Student Organizations
('Integrated Students in IT Education', 'ISITE', 'Student organization for IT students', 'active', 'isite@pupsmb.edu.ph'),
('Alliance of Computer Engineering Students', 'ACES', 'Student organization for computer engineering students', 'active', 'aces@pupsmb.edu.ph'),
('Junior Philippine Institute of Accountants', 'JPIA', 'Student organization for accounting students', 'active', 'jpia@pupsmb.edu.ph'),
('Association of Future Teachers', 'AFT', 'Student organization for education students', 'active', 'aft@pupsmb.edu.ph'),
('Hotel and Restaurant Management Society', 'HMSOC', 'Student organization for HRM students', 'active', 'hmsoc@pupsmb.edu.ph'),
('Chamber of Entrepreneurs and Managers', 'CEM', 'Student organization for business students', 'active', 'cem@pupsmb.edu.ph'),
('Diploma in Office Management SY-Quest', 'DOMT', 'Student organization for office management students', 'active', 'domt@pupsmb.edu.ph'),

-- Administrative Organizations
('Commission on Audit', 'COA', 'Government audit commission', 'active', 'coa@pupsmb.edu.ph'),
('Office of Student Services', 'OSS', 'Student services administration', 'active', 'oss@pupsmb.edu.ph'),
('Commission on Student Organizations and Accreditation', 'COSOA', 'Student organization oversight commission', 'active', 'cosoa@pupsmb.edu.ph');

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
('site_name', 'PUPSMB TransparaTech', 'string', 'general', 'Site name displayed in headers', true),
('site_description', 'Transparency Management System for PUPSMB', 'string', 'general', 'Site description for SEO', true),
('contact_email', 'admin@pupsmb.edu.ph', 'string', 'general', 'Main contact email', true),
('max_file_size', '52428800', 'number', 'uploads', 'Maximum file size in bytes (50MB)', false),
('allowed_file_types', '["pdf","doc","docx","xls","xlsx","jpg","jpeg","png"]', 'json', 'uploads', 'Allowed file types for uploads', false),
('auto_approval_enabled', 'false', 'boolean', 'workflow', 'Enable automatic approval for certain categories', false),
('email_notifications_enabled', 'true', 'boolean', 'notifications', 'Enable email notifications', false),
('maintenance_mode', 'false', 'boolean', 'system', 'System maintenance mode', false),
('session_timeout', '3600', 'number', 'security', 'Session timeout in seconds', false),
('max_login_attempts', '5', 'number', 'security', 'Maximum login attempts before lockout', false),
('password_min_length', '8', 'number', 'security', 'Minimum password length', false),
('password_max_length', '128', 'number', 'security', 'Maximum password length', false),
('require_password_complexity', 'true', 'boolean', 'security', 'Require complex passwords', false),
('password_hash_rounds', '12', 'number', 'security', 'Bcrypt hash rounds for password security', false),
('account_lockout_duration', '900', 'number', 'security', 'Account lockout duration in seconds (15 minutes)', false),
('lockout_multiplier_max', '10', 'number', 'security', 'Maximum lockout time multiplier', false),
('two_factor_enabled', 'false', 'boolean', 'security', 'Enable two-factor authentication', false),
('password_history_count', '5', 'number', 'security', 'Number of previous passwords to remember', false),
('force_password_change_days', '90', 'number', 'security', 'Force password change after N days', false),
('jwt_expiry', '7d', 'string', 'security', 'JWT token expiry time', false),
('jwt_refresh_expiry', '30d', 'string', 'security', 'JWT refresh token expiry time', false),
('require_email_verification', 'true', 'boolean', 'security', 'Require email verification for new accounts', false),
('backup_frequency', 'daily', 'string', 'system', 'Database backup frequency', false),
('data_retention_period', '365', 'number', 'system', 'Data retention period in days', false),
('security_headers_enabled', 'true', 'boolean', 'security', 'Enable security headers (CSRF, XSS protection)', false),
('rate_limiting_enabled', 'true', 'boolean', 'security', 'Enable API rate limiting', false),
('audit_log_retention', '1095', 'number', 'security', 'Audit log retention period in days (3 years)', false);

-- ======================================================
-- VIEWS FOR COMMON QUERIES
-- ======================================================

-- User details with role and organization
CREATE VIEW user_details AS
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.middle_name,
    u.student_number,
    u.employee_id,
    u.status,
    u.submission_count,
    u.approval_rate,
    r.name as role_name,
    r.display_name as role_display_name,
    o.name as organization_name,
    o.acronym as organization_acronym,
    u.created_at,
    u.last_login
FROM users u
LEFT JOIN roles r ON u.role_id = r.id
LEFT JOIN organizations o ON u.organization_id = o.id;

-- Submission summary view
CREATE VIEW submission_summary AS
SELECT 
    s.id,
    s.submission_number,
    s.title,
    s.status,
    s.priority,
    u.first_name || ' ' || u.last_name as submitter_name,
    o.name as organization_name,
    o.acronym as organization_acronym,
    dc.name as category_name,
    s.submitted_at,
    s.reviewed_at,
    s.created_at,
    (SELECT COUNT(*) FROM submission_files sf WHERE sf.submission_id = s.id) as file_count
FROM submissions s
LEFT JOIN users u ON s.submitter_id = u.id
LEFT JOIN organizations o ON s.organization_id = o.id
LEFT JOIN document_categories dc ON s.category_id = dc.id;

-- Organization statistics view
CREATE VIEW organization_stats AS
SELECT 
    o.id,
    o.name,
    o.acronym,
    o.status,
    o.member_count,
    o.officer_count,
    o.submission_count,
    COALESCE(pending_submissions, 0) as pending_submissions,
    COALESCE(approved_submissions, 0) as approved_submissions,
    CASE 
        WHEN o.submission_count > 0 THEN ROUND((approved_submissions::DECIMAL / o.submission_count) * 100, 2)
        ELSE 0 
    END as approval_rate,
    o.last_activity,
    o.created_at
FROM organizations o
LEFT JOIN (
    SELECT 
        organization_id,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_submissions,
        COUNT(*) FILTER (WHERE status = 'approved') as approved_submissions
    FROM submissions 
    GROUP BY organization_id
) stats ON o.id = stats.organization_id;

-- ======================================================
-- SECURITY POLICIES (ROW LEVEL SECURITY)
-- ======================================================

-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data unless they're admin
CREATE POLICY user_self_access ON users
FOR ALL TO PUBLIC
USING (id = current_setting('app.current_user_id')::UUID OR 
       EXISTS (SELECT 1 FROM role_permissions rp 
               JOIN roles r ON rp.role_id = r.id 
               WHERE r.name IN ('admin_full', 'admin_approval') 
               AND rp.role_id = (SELECT role_id FROM users WHERE id = current_setting('app.current_user_id')::UUID)));

-- Submissions access based on role and organization
CREATE POLICY submission_access ON submissions
FOR SELECT TO PUBLIC
USING (is_public = true OR 
       submitter_id = current_setting('app.current_user_id')::UUID OR
       organization_id = (SELECT organization_id FROM users WHERE id = current_setting('app.current_user_id')::UUID) OR
       EXISTS (SELECT 1 FROM role_permissions rp 
               JOIN roles r ON rp.role_id = r.id 
               WHERE r.name IN ('admin_full', 'admin_approval') 
               AND rp.role_id = (SELECT role_id FROM users WHERE id = current_setting('app.current_user_id')::UUID)));

-- ======================================================
-- PERFORMANCE OPTIMIZATION
-- ======================================================

-- Create partitions for activity_logs (by month)
CREATE TABLE activity_logs_y2025m01 PARTITION OF activity_logs
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE activity_logs_y2025m02 PARTITION OF activity_logs
FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

CREATE TABLE activity_logs_y2025m03 PARTITION OF activity_logs
FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');

CREATE TABLE activity_logs_y2025m04 PARTITION OF activity_logs
FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');

CREATE TABLE activity_logs_y2025m05 PARTITION OF activity_logs
FOR VALUES FROM ('2025-05-01') TO ('2025-06-01');

CREATE TABLE activity_logs_y2025m06 PARTITION OF activity_logs
FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');

CREATE TABLE activity_logs_y2025m07 PARTITION OF activity_logs
FOR VALUES FROM ('2025-07-01') TO ('2025-08-01');

CREATE TABLE activity_logs_y2025m08 PARTITION OF activity_logs
FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');

CREATE TABLE activity_logs_y2025m09 PARTITION OF activity_logs
FOR VALUES FROM ('2025-09-01') TO ('2025-10-01');

CREATE TABLE activity_logs_y2025m10 PARTITION OF activity_logs
FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');

CREATE TABLE activity_logs_y2025m11 PARTITION OF activity_logs
FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

CREATE TABLE activity_logs_y2025m12 PARTITION OF activity_logs
FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');

-- Create default partition for future dates
CREATE TABLE activity_logs_default PARTITION OF activity_logs DEFAULT;

-- Create materialized view for analytics
CREATE MATERIALIZED VIEW submission_analytics AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    status,
    COUNT(*) as count,
    organization_id
FROM submissions
GROUP BY DATE_TRUNC('month', created_at), status, organization_id;

-- Create unique index for concurrent refresh
CREATE UNIQUE INDEX ON submission_analytics (month, status, COALESCE(organization_id, '00000000-0000-0000-0000-000000000000'));

-- ======================================================
-- COMPLETION MESSAGE
-- ======================================================

-- Add a comment to confirm schema creation
COMMENT ON DATABASE CURRENT_DATABASE() IS 'TransparaTech Database Schema v1.0 - Created on November 4, 2025';

-- Final verification query
SELECT 'TransparaTech database schema created successfully!' as status,
       COUNT(*) as total_tables
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';