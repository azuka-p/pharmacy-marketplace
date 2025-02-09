package service

import (
	"context"
	"healthcare/entity"
	"healthcare/repo"
)

type LogisticPartnerServiceItf interface {
	GetLogisticPartnerService(ctx context.Context) ([]*entity.LogisticPartner, error)
}

type LogisticPartnerServiceImpl struct {
	shippingRepo repo.ShippingRepoItf
}

func NewLogisticPartnerService(shippingRepo repo.ShippingRepoItf) LogisticPartnerServiceItf {
	return &LogisticPartnerServiceImpl{
		shippingRepo: shippingRepo,
	}
}
