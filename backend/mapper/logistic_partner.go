package mapper

import (
	"healthcare/dto"
	"healthcare/entity"
)

func LogisticPartnerToGetResponseDto(entity *entity.LogisticPartner) *dto.LogisticPartnerGetResponse {
	return &dto.LogisticPartnerGetResponse{
		Id:   entity.Id,
		Name: entity.Name,
	}
}
