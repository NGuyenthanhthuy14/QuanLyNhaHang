import { mediaRequests } from "@/apiRequests/media"
import { useMutation } from "@tanstack/react-query"

export const useUploadMediaMutation = () => {
	return useMutation({
		mutationFn: mediaRequests.uploadImage
	})
}