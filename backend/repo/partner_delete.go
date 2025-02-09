package repo

import (
	"context"
	"healthcare/constant"

	"github.com/huandu/go-sqlbuilder"
)

func (r *PartnerRepoImpl) DeletePartner(ctx context.Context, id int64) error {

	ub := sqlbuilder.NewUpdateBuilder()
	ub.Update("partners").
		Set(
			ub.Assign("deleted_at", "NOW()"),
			ub.Assign("updated_at", "NOW()"),
		).
		Where(
			ub.Equal("id", id),
			ub.IsNull("deleted_at"),
		)

	query, args := ub.BuildWithFlavor(constant.DATABASE_FLAVOR)
	_, err := r.db.ExecContext(ctx, query, args...)
	if err != nil {
		return err
	}

	return nil
}
