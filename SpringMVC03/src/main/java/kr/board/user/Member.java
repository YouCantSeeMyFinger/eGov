package kr.board.user;

import lombok.Data;

@Data
public class Member {

	private int memberIdx;
	private String memberId;
	private String memberPassword;
	private String memberName;
	private Integer memberAge;
	private String memberGender;
	private String memberEmail;
	private String memberProfile;

}
