package kr.board.user;

import lombok.Data;

@Data
public class Member {

	private int memberIdx;
	private String memberID;
	private String memberPassword;
	private String memberName;
	private int memberAge;
	private String memberGender;
	private String memberEmail;
	private String memberProfile;

}
