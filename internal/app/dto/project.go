package dto

import "time"

type CreateProjectRequest struct {
	Name             string `json:"name" validate:"required"`
	Framework        string `json:"framework" validate:"required"`
	GitUrl           string `json:"git_url" validate:"required"`
	ProductionBranch string `json:"production_branch" validate:"required"`
	GitID            uint   `json:"git_id" validate:"required"`
	GitRepo          string `json:"git_repo" validate:"required"`
	BuildCommand     string `json:"build_command"`
	OutputDir        string `json:"output_dir"`
	InstallCommand   string `json:"install_command"`
	// TODO: Check request dto!
}

type ListProjectResponse struct {
	Status  string                 `json:"status"`
	Message string                 `json:"message"`
	Data    []*ProjectListResponse `json:"data"`
}

type ProjectListResponse struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Domain    string    `json:"domain"`
	GitHash   string    `json:"git_hash"`
	GitDate   time.Time `json:"git_date"`
	GitBranch string    `json:"git_branch"`
	GitCommit string    `json:"git_commit"`
}